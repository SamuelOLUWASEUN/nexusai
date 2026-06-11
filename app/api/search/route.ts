import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ results: [] });

    const { query } = await request.json();
    if (!query) return NextResponse.json({ results: [] });

    const word = query.split(" ").find((w: string) => w.length > 3) || query;

    const { data: a } = await supabase
      .from("indexed_content")
      .select("id, title, content, url, tool")
      .eq("user_id", user.id)
      .ilike("content", "%" + word + "%")
      .limit(4);

    const { data: b } = await supabase
      .from("indexed_content")
      .select("id, title, content, url, tool")
      .eq("user_id", user.id)
      .ilike("title", "%" + word + "%")
      .limit(3);

    const seen = new Set<string>();
    const results = [...(a || []), ...(b || [])].filter(r => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    }).slice(0, 5);

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}