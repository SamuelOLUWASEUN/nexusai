import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code   = searchParams.get("code");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!code) return NextResponse.redirect(appUrl + "/dashboard?error=notion_auth_failed");

  try {
    const credentials = Buffer.from(
      process.env.NOTION_CLIENT_ID + ":" + process.env.NOTION_CLIENT_SECRET
    ).toString("base64");

    const tokenRes = await fetch("https://api.notion.com/v1/oauth/token", {
      method:  "POST",
      headers: {
        "Authorization": "Basic " + credentials,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        grant_type:   "authorization_code",
        code,
        redirect_uri: appUrl + "/api/notion/callback",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.redirect(appUrl + "/dashboard?error=notion_token_failed");
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.redirect(appUrl + "/login");

    await supabase.from("user_integrations").upsert({
      user_id:        user.id,
      tool_slug:      "notion",
      connected:      true,
      access_token:   tokenData.access_token,
      workspace_id:   tokenData.workspace_id,
      workspace_name: tokenData.workspace_name,
    }, { onConflict: "user_id,tool_slug" });

    fetch(appUrl + "/api/notion/index", { method: "POST" }).catch(console.error);
    return NextResponse.redirect(appUrl + "/dashboard?connected=notion");

  } catch (error) {
    console.error("Notion OAuth error:", error);
    return NextResponse.redirect(appUrl + "/dashboard?error=notion_failed");
  }
}