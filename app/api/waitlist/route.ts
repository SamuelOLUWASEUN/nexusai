import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, company, role, use_case } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase.from("waitlist").insert({
      email,
      company:  company  || null,
      role:     role     || null,
      use_case: use_case || null,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "Email already on waitlist" }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
