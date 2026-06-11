import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function searchIndexedContent(query: string, userId: string) {
  try {
    const supabase = createClient();
    const word = query.split(" ").find((w: string) => w.length > 3) || query.split(" ")[0];

    const { data: a } = await supabase
      .from("indexed_content")
      .select("id, title, content, url, tool")
      .eq("user_id", userId)
      .ilike("content", "%" + word + "%")
      .limit(4);

    const { data: b } = await supabase
      .from("indexed_content")
      .select("id, title, content, url, tool")
      .eq("user_id", userId)
      .ilike("title", "%" + word + "%")
      .limit(3);

    const seen = new Set<string>();
    return [...(a || []), ...(b || [])].filter(r => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    }).slice(0, 5);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { messages, context } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const lastMessage = messages[messages.length - 1];
    const userQuery   = lastMessage?.content || "";

    let contextDocs: any[] = [];
    let contextText = "";

    if (user && userQuery) {
      contextDocs = await searchIndexedContent(userQuery, user.id);
      if (contextDocs.length > 0) {
        contextText = "\n\nRELEVANT CONTENT FROM YOUR CONNECTED TOOLS:\n" +
          contextDocs.map((doc, i) =>
            "[" + (i + 1) + "] FROM " + doc.tool.toUpperCase() + " — \"" + doc.title + "\"\n" +
            doc.content.slice(0, 800) + "\nSource: " + doc.url
          ).join("\n\n---\n\n");
      }
    }

    const tools       = context?.tools || [];
    const hasRealData = contextDocs.length > 0;

    const systemPrompt = `You are Nexus AI, an intelligent workspace assistant that helps teams find information, summarize documents, analyze data and automate tasks.

${hasRealData
  ? "You have access to REAL content from the user's connected tools. Use this content to give accurate, specific answers. Always cite which tool and document the information came from."
  : "You are connected to: " + tools.join(", ") + ". No content has been indexed yet. Answer helpfully from general knowledge."
}

Guidelines:
- When you have real content, reference it specifically
- Always mention which tool and document your answer came from
- If no relevant content found, say so and answer from general knowledge
- Be concise, clear and actionable
- Format with headers and bullets when appropriate
${contextText}`;

    const response = await client.messages.create({
      model:      "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system:     systemPrompt,
      messages:   messages.map((m: any) => ({ role: m.role, content: m.content })),
    });

    const content = response.content
      .filter(block => block.type === "text")
      .map(block => (block as any).text)
      .join("");

    const sources = contextDocs.map(doc => ({
      title: doc.title,
      url:   doc.url,
      tool:  doc.tool,
    }));

    return NextResponse.json({ content, sources, usage: response.usage });

  } catch (error: any) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to process request" },
      { status: 500 }
    );
  }
}
