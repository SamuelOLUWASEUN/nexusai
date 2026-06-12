import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "alabims10@gmail.com";

export async function GET(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Verify admin
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get all users
    const { data: { users } } = await supabase.auth.admin.listUsers();

    // Get integrations stats
    const { data: integrations } = await supabase
      .from("user_integrations")
      .select("user_id, tool_slug, connected")
      .eq("connected", true);

    // Get conversations stats
    const { data: conversations } = await supabase
      .from("conversations")
      .select("user_id, created_at");

    // Get waitlist
    const { data: waitlist } = await supabase
      .from("waitlist")
      .select("email, created_at")
      .order("created_at", { ascending: false });

    // Get indexed content stats
    const { data: indexed } = await supabase
      .from("indexed_content")
      .select("user_id, tool");

    // Build user stats
    const userStats = users.map(u => ({
      id:            u.id,
      email:         u.email,
      name:          u.user_metadata?.full_name || "—",
      company:       u.user_metadata?.company   || "—",
      role:          u.user_metadata?.role       || "—",
      created_at:    u.created_at,
      last_sign_in:  u.last_sign_in_at,
      integrations:  integrations?.filter(i => i.user_id === u.id).map(i => i.tool_slug) || [],
      conversations: conversations?.filter(c => c.user_id === u.id).length || 0,
      pages_indexed: indexed?.filter(p => p.user_id === u.id).length || 0,
    }));

    return NextResponse.json({
      stats: {
        total_users:         users.length,
        active_integrations: integrations?.length || 0,
        total_conversations: conversations?.length || 0,
        total_indexed:       indexed?.length || 0,
        waitlist_count:      waitlist?.length || 0,
      },
      users:   userStats,
      waitlist: waitlist || [],
    });

  } catch (error: any) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
