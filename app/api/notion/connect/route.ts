import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const appUrl   = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const clientId = process.env.NOTION_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(appUrl + "/dashboard?error=notion_not_configured");
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.redirect(appUrl + "/login");
  }

  const notionUrl = "https://api.notion.com/v1/oauth/authorize?" +
    "client_id=" + clientId +
    "&response_type=code" +
    "&owner=user" +
    "&redirect_uri=" + encodeURIComponent(appUrl + "/api/notion/callback") +
    "&state=" + userId;

  return NextResponse.redirect(notionUrl);
}