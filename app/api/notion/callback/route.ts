import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code  = searchParams.get("code");
  const state = searchParams.get("state");
  const origin = new URL(request.url).origin;

  if (!code) {
    return NextResponse.redirect(origin + "/dashboard?error=notion_auth_failed");
  }

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
        redirect_uri: origin + "/api/notion/callback",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error("Notion token error:", tokenData);
      return NextResponse.redirect(origin + "/dashboard?error=notion_token_failed");
    }

    const userId = state;
    if (!userId) {
      return NextResponse.redirect(origin + "/login");
    }

    // Use service role to bypass RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from("user_integrations").upsert({
      user_id:        userId,
      tool_slug:      "notion",
      connected:      true,
      access_token:   tokenData.access_token,
      workspace_id:   tokenData.workspace_id,
      workspace_name: tokenData.workspace_name,
    }, { onConflict: "user_id,tool_slug" });

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.redirect(origin + "/dashboard?error=save_failed");
    }

    fetch(origin + "/api/notion/index", { method: "POST" }).catch(console.error);
    return NextResponse.redirect(origin + "/dashboard?connected=notion");

  } catch (error) {
    console.error("Notion OAuth error:", error);
    return NextResponse.redirect(origin + "/dashboard?error=notion_failed");
  }
}