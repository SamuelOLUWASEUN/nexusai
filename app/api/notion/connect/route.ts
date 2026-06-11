import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const appUrl   = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const clientId = process.env.NOTION_CLIENT_ID;
  if (!clientId) return NextResponse.json({ error: "Notion not configured" }, { status: 500 });

  const url = "https://api.notion.com/v1/oauth/authorize?" +
    "client_id=" + clientId +
    "&response_type=code" +
    "&owner=user" +
    "&redirect_uri=" + encodeURIComponent(appUrl + "/api/notion/callback") +
    "&state=" + user.id;

  return NextResponse.json({ url });
}