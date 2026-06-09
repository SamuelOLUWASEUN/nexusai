// ─── User & Auth ─────────────────────────────────────────────────
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  role: string | null;
  plan: "free" | "pro" | "enterprise";
  avatar_url: string | null;
  onboarded: boolean;
  created_at: string;
};

// ─── Workspace ───────────────────────────────────────────────────
export type Workspace = {
  id: string;
  name: string;
  owner_id: string;
  plan: "free" | "pro" | "enterprise";
  members_count: number;
  integrations: string[];
  created_at: string;
};

// ─── AI Features ─────────────────────────────────────────────────
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  sources?: Source[];
};

export type Source = {
  title: string;
  url: string;
  tool: string;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  created_at: string;
};

// ─── Integrations ────────────────────────────────────────────────
export type Integration = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  category: "communication" | "project" | "docs" | "crm" | "code" | "data";
  connected: boolean;
  description: string;
};

// ─── Waitlist ────────────────────────────────────────────────────
export type WaitlistEntry = {
  id: string;
  email: string;
  company: string | null;
  role: string | null;
  use_case: string | null;
  created_at: string;
};

// ─── Analytics ───────────────────────────────────────────────────
export type UsageStat = {
  date: string;
  queries: number;
  time_saved_minutes: number;
};

// ─── API Responses ───────────────────────────────────────────────
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type AIStreamResponse = {
  content: string;
  done: boolean;
  sources?: Source[];
};
