import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

async function fetchBlocks(pageId: string, token: string): Promise<string> {
  try {
    const res = await fetch("https://api.notion.com/v1/blocks/" + pageId + "/children?page_size=100", {
      headers: {
        "Authorization":  "Bearer " + token,
        "Notion-Version": "2022-06-28",
      },
    });
    if (!res.ok) return "";
    const data = await res.json();
    return (data.results || []).map((block: any) => {
      const c = block[block.type];
      return c?.rich_text ? c.rich_text.map((rt: any) => rt.plain_text || "").join("") : "";
    }).filter(Boolean).join("\n");
  } catch { return ""; }
}

export async function POST() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: integration } = await supabase
      .from("user_integrations")
      .select("access_token, workspace_name")
      .eq("user_id", user.id)
      .eq("tool_slug", "notion")
      .single();

    if (!integration?.access_token) {
      return NextResponse.json({ error: "Notion not connected" }, { status: 400 });
    }

    const token = integration.access_token;
    let indexed = 0;
    let cursor: string | undefined;

    do {
      const res = await fetch("https://api.notion.com/v1/search", {
        method:  "POST",
        headers: {
          "Authorization":  "Bearer " + token,
          "Notion-Version": "2022-06-28",
          "Content-Type":   "application/json",
        },
        body: JSON.stringify({
          filter:       { value: "page", property: "object" },
          page_size:    50,
          start_cursor: cursor,
        }),
      });

      if (!res.ok) break;
      const data = await res.json();

      for (const page of data.results || []) {
        try {
          let title = "Untitled";
          for (const prop of Object.values(page.properties || {}) as any[]) {
            if ((prop as any)?.title?.[0]?.plain_text) {
              title = (prop as any).title[0].plain_text;
              break;
            }
          }
          const content = await fetchBlocks(page.id, token);
          const text = (title + "\n\n" + content).trim();
          if (text.length < 10) continue;

          await supabase.from("indexed_content").upsert({
            user_id:    user.id,
            tool:       "notion",
            source_id:  page.id,
            title,
            content:    text.slice(0, 10000),
            url:        page.url,
            metadata:   { workspace: integration.workspace_name },
            indexed_at: new Date().toISOString(),
          }, { onConflict: "user_id,tool,source_id" });
          indexed++;
        } catch (e) { console.error(e); }
      }
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);

    return NextResponse.json({ success: true, indexed });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}