"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Plus, Sparkles, Search, FileText, Video, BarChart3, Settings, LogOut, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const SUGGESTED_PROMPTS = [
  "What were the key decisions from this week's meetings?",
  "Summarize all customer complaints from the past 7 days",
  "Draft a Q3 update email for stakeholders",
  "What are the open P1 bugs assigned to our team?",
  "Who on the team has been most active on GitHub this sprint?",
  "What's changed in our product docs in the last month?",
];
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string; id: string };

const QUICK_ACTIONS = [
  { icon: Search,    label: "Search",        prompt: "Search across all my connected tools for: "                     },
  { icon: Video,     label: "Summarize call", prompt: "Summarize the last meeting recording and extract action items"  },
  { icon: FileText,  label: "Draft update",   prompt: "Draft a weekly status update for my team covering: "            },
  { icon: BarChart3, label: "Get insights",   prompt: "Give me insights and trends from the last 30 days of data"     },
];

const CONNECTED_TOOLS = ["Slack", "Notion", "GitHub", "Linear", "Google Drive"];

export default function DashboardPage() {
  const router   = useRouter();
  const supabase = createClient();
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);

  const [user, setUser]         = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(content?: string) {
    const text = (content ?? input).trim();
    if (!text || loading) return;

    setInput("");
    setApiError("");

    const userMsg: Message = { role: "user", content: text, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const allMessages = [...messages, userMsg].map(m => ({
        role:    m.role,
        content: m.content,
      }));

      const response = await fetch("/api/ai", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          messages: allMessages,
          context:  { tools: CONNECTED_TOOLS },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error ${response.status}`);
      }

      if (!data.content) {
        throw new Error("Empty response from AI");
      }

      const assistantMsg: Message = {
        role:    "assistant",
        content: data.content,
        id:      (Date.now() + 1).toString(),
      };
      setMessages(prev => [...prev, assistantMsg]);

    } catch (err: any) {
      const msg = err?.message || "Failed to get a response. Please try again.";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="flex h-screen bg-cream-50 dark:bg-navy-950 overflow-hidden">

      {/* ── SIDEBAR ── */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-navy-900 border-r border-navy-100 dark:border-navy-800 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-navy-100 dark:border-navy-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-navy-900 dark:bg-accent-blue flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display font-semibold text-base text-navy-900 dark:text-cream-50">
              Nexus <span className="text-accent-blue">AI</span>
            </span>
          </div>
        </div>

        {/* New chat */}
        <div className="p-4 border-b border-navy-100 dark:border-navy-800">
          <button
            onClick={() => { setMessages([]); setApiError(""); }}
            className="btn-primary w-full py-2.5 text-sm"
          >
            <Plus size={15} /> New Chat
          </button>
        </div>

        {/* Connected tools */}
        <div className="p-4 border-b border-navy-100 dark:border-navy-800">
          <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider mb-3">
            Connected Tools
          </p>
          <div className="space-y-1.5">
            {CONNECTED_TOOLS.map(tool => (
              <div key={tool} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="font-body text-sm text-navy-600 dark:text-cream-300">{tool}</span>
              </div>
            ))}
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-accent-blue hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors w-full mt-1">
              <Plus size={13} />
              <span className="font-body text-sm font-medium">Add integration</span>
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="p-4 flex-1 overflow-y-auto">
          <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider mb-3">
            Quick Actions
          </p>
          <div className="space-y-1">
            {QUICK_ACTIONS.map(action => (
              <button
                key={action.label}
                onClick={() => { setInput(action.prompt); inputRef.current?.focus(); }}
                className="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors text-left group"
              >
                <action.icon size={15} className="text-navy-400 dark:text-cream-500 group-hover:text-accent-blue transition-colors flex-shrink-0" />
                <span className="font-body text-sm text-navy-600 dark:text-cream-300">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-navy-100 dark:border-navy-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0">
              {firstName[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-body font-semibold text-sm text-navy-900 dark:text-cream-100 truncate">{firstName}</p>
              <p className="font-mono text-xs text-navy-400 dark:text-cream-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-navy-500 dark:text-cream-400 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors text-xs font-body">
              <Settings size={13} /> Settings
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-navy-500 dark:text-cream-400 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors text-xs font-body"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-accent-blue" />
            <div>
              <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm">Nexus AI Workspace</p>
              <p className="font-mono text-xs text-navy-400 dark:text-cream-500">
                Searching across {CONNECTED_TOOLS.length} connected tools
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-green-700 dark:text-green-400">Live</span>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Empty / welcome state */}
            {messages.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-14 h-14 rounded-2xl bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-center mx-auto mb-5">
                  <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M9 2V16M2.5 6L15.5 12M15.5 6L2.5 12" stroke="#2563eb" strokeWidth="1" opacity="0.5"/>
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100 mb-2">
                  Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {firstName}!
                </h2>
                <p className="font-body text-navy-500 dark:text-cream-400 text-sm mb-10">
                  Ask me anything. I'm connected to {CONNECTED_TOOLS.join(", ")}.
                </p>

                <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider mb-4">
                  Try asking...
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(prompt)}
                      className="px-4 py-3 rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 hover:border-accent-blue/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all group text-left"
                    >
                      <p className="font-body text-sm text-navy-700 dark:text-cream-300 leading-snug group-hover:text-navy-900 dark:group-hover:text-cream-100">
                        {prompt}
                      </p>
                      <ChevronRight size={13} className="text-navy-300 dark:text-navy-600 group-hover:text-accent-blue mt-1.5 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message bubbles */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1",
                  msg.role === "assistant"
                    ? "bg-navy-900 dark:bg-accent-blue"
                    : "bg-gradient-to-br from-accent-blue to-accent-indigo"
                )}>
                  {msg.role === "assistant" ? (
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <span className="text-white font-body font-bold text-xs">
                      {firstName[0]?.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Bubble */}
                <div className={cn(
                  "rounded-2xl px-4 py-3 max-w-xl text-sm font-body leading-relaxed",
                  msg.role === "user"
                    ? "bg-accent-blue text-white rounded-tr-sm"
                    : "bg-navy-50 dark:bg-navy-700/50 border border-navy-100 dark:border-navy-600 text-navy-700 dark:text-cream-200 rounded-tl-sm"
                )}>
                  <div className="whitespace-pre-wrap">
                    {msg.content.split("**").map((part, i) =>
                      i % 2 === 1
                        ? <strong key={i} className="font-semibold">{part}</strong>
                        : <span key={i}>{part}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-navy-900 dark:bg-accent-blue flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="bg-navy-50 dark:bg-navy-700/50 border border-navy-100 dark:border-navy-600 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-navy-400 dark:text-cream-500" />
                  <span className="font-body text-sm text-navy-400 dark:text-cream-500">
                    Searching {CONNECTED_TOOLS.length} tools...
                  </span>
                </div>
              </div>
            )}

            {/* API error inline */}
            {apiError && !loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={14} className="text-red-500" />
                </div>
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xl">
                  <p className="font-body text-sm text-red-600 dark:text-red-400">{apiError}</p>
                  <p className="font-body text-xs text-red-400 dark:text-red-500 mt-1">
                    Check that your ANTHROPIC_API_KEY is set in .env.local
                  </p>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="px-6 py-4 border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-3 bg-navy-50 dark:bg-navy-800 border border-navy-200 dark:border-navy-600 rounded-2xl px-4 py-3 focus-within:border-accent-blue focus-within:ring-2 focus-within:ring-accent-blue/20 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Nexus anything about your company..."
                rows={1}
                className="flex-1 bg-transparent font-body text-sm text-navy-900 dark:text-cream-100 placeholder-navy-300 dark:placeholder-navy-500 outline-none leading-relaxed resize-none"
                style={{ minHeight: "24px", maxHeight: "160px" }}
                onInput={e => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 160) + "px";
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                  input.trim() && !loading
                    ? "bg-navy-900 dark:bg-accent-blue text-white hover:bg-navy-700 dark:hover:bg-blue-500"
                    : "bg-navy-200 dark:bg-navy-700 text-navy-400 dark:text-navy-500 cursor-not-allowed"
                )}
              >
                <Send size={14} />
              </button>
            </div>
            <p className="font-body text-xs text-navy-400 dark:text-cream-600 text-center mt-2">
              Press <kbd className="px-1 py-0.5 rounded bg-navy-100 dark:bg-navy-800 font-mono text-xs border border-navy-200 dark:border-navy-700">Enter</kbd> to send ·{" "}
              <kbd className="px-1 py-0.5 rounded bg-navy-100 dark:bg-navy-800 font-mono text-xs border border-navy-200 dark:border-navy-700">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}