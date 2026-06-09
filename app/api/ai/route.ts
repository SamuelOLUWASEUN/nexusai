import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages, context } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const systemPrompt = `You are Nexus AI, an intelligent workspace assistant that helps teams find information, summarize documents, analyze data, and automate tasks across their connected tools.

You have access to the following connected tools and data sources: ${context?.tools?.join(", ") || "Slack, Notion, Google Drive, GitHub, Linear, Jira, HubSpot, Zoom, Intercom"}.

Your capabilities include:
- Searching and synthesizing information across all connected tools
- Summarizing meetings, documents, and conversations
- Drafting emails, updates, reports and other documents
- Identifying action items, trends and insights
- Answering questions about company data with cited sources

Guidelines:
- Always be clear, concise and professionally helpful
- When referencing specific data, mention which tool it came from (e.g., "According to your Notion docs...")
- Format responses clearly with headers and bullet points when appropriate
- If you're synthesizing from multiple sources, list the sources at the end
- Be proactive — suggest next steps or related information when relevant
- Keep responses focused and actionable

Persona: You are knowledgeable, efficient and feel like a brilliant colleague who knows everything about the company.`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role:    m.role,
        content: m.content,
      })),
    });

    const content = response.content
      .filter(block => block.type === "text")
      .map(block => (block as any).text)
      .join("");

    return NextResponse.json({ content, usage: response.usage });

  } catch (error: any) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { error: error?.message ?? "Failed to process request" },
      { status: 500 }
    );
  }
}
