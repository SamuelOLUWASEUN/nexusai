import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const clientId = process.env.NOTION_CLIENT_ID;

  if (!clientId) {
    return NextResponse.redirect(
      new URL("/dashboard?error=notion_not_configured", request.url)
    );
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Use the actual request origin so it works on both localhost and production
  const origin = new URL(request.url).origin;

  const notionUrl = "https://api.notion.com/v1/oauth/authorize?" +
    "client_id=" + clientId +
    "&response_type=code" +
    "&owner=user" +
    "&redirect_uri=" + encodeURIComponent(origin + "/api/notion/callback") +
    "&state=" + userId;

  return NextResponse.redirect(notionUrl);
}