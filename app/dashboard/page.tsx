"use client";
import { useState, useRef, useEffect } from "react";
import {
  Send, Plus, Sparkles, Search, FileText, Video, BarChart3,
  Settings, LogOut, ChevronRight, Loader2, AlertCircle, X,
  User, Shield, Bell, Moon, Sun, Check, Plug, Trash2
} from "lucide-react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/lib/theme-store";

type Message = { role: "user" | "assistant"; content: string; id: string };

const QUICK_ACTIONS = [
  { icon: Search,    label: "Search",        prompt: "Search across all my connected tools for: "                    },
  { icon: Video,     label: "Summarize call", prompt: "Summarize the last meeting recording and extract action items" },
  { icon: FileText,  label: "Draft update",   prompt: "Draft a weekly status update for my team covering: "           },
  { icon: BarChart3, label: "Get insights",   prompt: "Give me insights and trends from the last 30 days of data"    },
];

const SUGGESTED_PROMPTS = [
  "What were the key decisions from this week's meetings?",
  "Summarize all customer complaints from the past 7 days",
  "Draft a Q3 update email for stakeholders",
  "What are the open P1 bugs assigned to our team?",
  "Who on the team has been most active on GitHub this sprint?",
  "What's changed in our product docs in the last month?",
];

const ALL_INTEGRATIONS = [
  { name: "Slack",        icon: "💬", category: "Communication", connected: true  },
  { name: "Notion",       icon: "📝", category: "Docs",          connected: true  },
  { name: "GitHub",       icon: "🐙", category: "Code",          connected: true  },
  { name: "Linear",       icon: "◈",  category: "Project",       connected: true  },
  { name: "Google Drive", icon: "📁", category: "Docs",          connected: true  },
  { name: "Jira",         icon: "🔷", category: "Project",       connected: false },
  { name: "HubSpot",      icon: "🟠", category: "CRM",           connected: false },
  { name: "Zoom",         icon: "📹", category: "Communication", connected: false },
  { name: "Figma",        icon: "🎨", category: "Design",        connected: false },
  { name: "Intercom",     icon: "💭", category: "Support",       connected: false },
  { name: "Confluence",   icon: "📖", category: "Docs",          connected: false },
  { name: "Salesforce",   icon: "☁️", category: "CRM",           connected: false },
  { name: "Asana",        icon: "🔴", category: "Project",       connected: false },
  { name: "Gmail",        icon: "📧", category: "Communication", connected: false },
  { name: "Loom",         icon: "🎬", category: "Communication", connected: false },
  { name: "PagerDuty",    icon: "🚨", category: "Engineering",   connected: false },
];

export default function DashboardPage() {
  const router   = useRouter();
  const supabase = createClient();
  const { theme, toggleTheme } = useThemeStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  const [user, setUser]                         = useState<any>(null);
  const [messages, setMessages]                 = useState<Message[]>([]);
  const [input, setInput]                       = useState("");
  const [loading, setLoading]                   = useState(false);
  const [apiError, setApiError]                 = useState("");
  const [showSettings, setShowSettings]         = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [integrations, setIntegrations]         = useState(ALL_INTEGRATIONS);
  const [settingsTab, setSettingsTab]           = useState<"profile" | "preferences" | "security">("profile");
  const [savingProfile, setSavingProfile]       = useState(false);
  const [profileForm, setProfileForm]           = useState({ full_name: "", company: "", role: "" });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push("/login"); return; }
      setUser(data.user);
      setProfileForm({
        full_name: data.user.user_metadata?.full_name || "",
        company:   data.user.user_metadata?.company   || "",
        role:      data.user.user_metadata?.role      || "",
      });
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
      const response = await fetch("/api/ai", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          context:  { tools: integrations.filter(i => i.connected).map(i => i.name) },
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Error ${response.status}`);
      if (!data.content) throw new Error("Empty response from AI");
      setMessages(prev => [...prev, { role: "assistant", content: data.content, id: (Date.now() + 1).toString() }]);
    } catch (err: any) {
      const msg = err?.message || "Failed to get a response.";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleSaveProfile() {
    setSavingProfile(true);
    const { error } = await supabase.auth.updateUser({ data: profileForm });
    if (error) toast.error("Failed to save profile");
    else {
      toast.success("Profile saved!");
      setUser((u: any) => ({ ...u, user_metadata: { ...u.user_metadata, ...profileForm } }));
    }
    setSavingProfile(false);
  }

  function toggleIntegration(name: string) {
    const integration = integrations.find(i => i.name === name);
    setIntegrations(prev => prev.map(i => i.name === name ? { ...i, connected: !i.connected } : i));
    toast.success(integration?.connected ? `${name} disconnected` : `${name} connected!`);
  }

  const connectedTools = integrations.filter(i => i.connected);
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";
return (
    <div className="flex h-screen bg-cream-50 dark:bg-navy-950 overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-navy-900 border-r border-navy-100 dark:border-navy-800 flex flex-col">
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

        <div className="p-4 border-b border-navy-100 dark:border-navy-800">
          <button onClick={() => { setMessages([]); setApiError(""); }} className="btn-primary w-full py-2.5 text-sm">
            <Plus size={15} /> New Chat
          </button>
        </div>

        <div className="p-4 border-b border-navy-100 dark:border-navy-800">
          <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider mb-3">
            Connected Tools ({connectedTools.length})
          </p>
          <div className="space-y-1">
            {connectedTools.map(tool => (
              <div key={tool.name} className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="font-body text-sm text-navy-600 dark:text-cream-300">{tool.name}</span>
              </div>
            ))}
            <button
              onClick={() => setShowIntegrations(true)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-accent-blue hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors w-full mt-1"
            >
              <Plus size={13} />
              <span className="font-body text-sm font-medium">Add integration</span>
            </button>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider mb-3">Quick Actions</p>
          <div className="space-y-1">
            {QUICK_ACTIONS.map(action => (
              <button key={action.label}
                onClick={() => { setInput(action.prompt); inputRef.current?.focus(); }}
                className="flex items-center gap-2.5 w-full px-2 py-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors text-left group"
              >
                <action.icon size={15} className="text-navy-400 group-hover:text-accent-blue transition-colors flex-shrink-0" />
                <span className="font-body text-sm text-navy-600 dark:text-cream-300">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-navy-100 dark:border-navy-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {firstName[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-body font-semibold text-sm text-navy-900 dark:text-cream-100 truncate">{firstName}</p>
              <p className="font-mono text-xs text-navy-400 dark:text-cream-500 truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowSettings(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-navy-500 dark:text-cream-400 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors text-xs font-body">
              <Settings size={13} /> Settings
            </button>
            <button onClick={handleSignOut}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-navy-500 dark:text-cream-400 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors text-xs font-body">
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-accent-blue" />
            <div>
              <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm">Nexus AI Workspace</p>
              <p className="font-mono text-xs text-navy-400 dark:text-cream-500">Searching across {connectedTools.length} connected tools</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-500 dark:text-cream-400 hover:bg-navy-100 dark:hover:bg-navy-800 transition-all">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-xs text-green-700 dark:text-green-400">Live</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
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
                  Ask me anything. I'm connected to {connectedTools.map(t => t.name).join(", ")}.
                </p>
                <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider mb-4">Try asking...</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button key={i} onClick={() => sendMessage(prompt)}
                      className="px-4 py-3 rounded-xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800 hover:border-accent-blue/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all group text-left">
                      <p className="font-body text-sm text-navy-700 dark:text-cream-300 leading-snug">{prompt}</p>
                      <ChevronRight size={13} className="text-navy-300 group-hover:text-accent-blue mt-1.5 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map(msg => (
              <div key={msg.id} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1",
                  msg.role === "assistant" ? "bg-navy-900 dark:bg-accent-blue" : "bg-gradient-to-br from-accent-blue to-accent-indigo")}>
                  {msg.role === "assistant"
                    ? <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    : <span className="text-white font-bold text-xs">{firstName[0]?.toUpperCase()}</span>}
                </div>
                <div className={cn("rounded-2xl px-4 py-3 max-w-xl text-sm font-body leading-relaxed",
                  msg.role === "user"
                    ? "bg-accent-blue text-white rounded-tr-sm"
                    : "bg-navy-50 dark:bg-navy-700/50 border border-navy-100 dark:border-navy-600 text-navy-700 dark:text-cream-200 rounded-tl-sm")}>
                  <div className="whitespace-pre-wrap">
                    {msg.content.split("**").map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>)}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-navy-900 dark:bg-accent-blue flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </div>
                <div className="bg-navy-50 dark:bg-navy-700/50 border border-navy-100 dark:border-navy-600 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-navy-400" />
                  <span className="font-body text-sm text-navy-400 dark:text-cream-500">Searching {connectedTools.length} tools...</span>
                </div>
              </div>
            )}

            {apiError && !loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={14} className="text-red-500" />
                </div>
                <div className="bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 rounded-2xl rounded-tl-sm px-4 py-3 max-w-xl">
                  <p className="font-body text-sm text-red-600 dark:text-red-400">{apiError}</p>
                  <p className="font-body text-xs text-red-400 mt-1">Check your ANTHROPIC_API_KEY in .env.local</p>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3 bg-navy-50 dark:bg-navy-800 border border-navy-200 dark:border-navy-600 rounded-2xl px-4 py-3 focus-within:border-accent-blue focus-within:ring-2 focus-within:ring-accent-blue/20 transition-all">
              <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Ask Nexus anything about your company..." rows={1}
                className="flex-1 bg-transparent font-body text-sm text-navy-900 dark:text-cream-100 placeholder-navy-300 dark:placeholder-navy-500 outline-none leading-relaxed resize-none"
                style={{ minHeight: "24px", maxHeight: "160px" }}
                onInput={e => { const t = e.target as HTMLTextAreaElement; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 160) + "px"; }}
              />
              <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
                className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                  input.trim() && !loading ? "bg-navy-900 dark:bg-accent-blue text-white hover:bg-navy-700" : "bg-navy-200 dark:bg-navy-700 text-navy-400 cursor-not-allowed")}>
                <Send size={14} />
              </button>
            </div>
            <p className="font-body text-xs text-navy-400 text-center mt-2">
              Press <kbd className="px-1 py-0.5 rounded bg-navy-100 dark:bg-navy-800 font-mono text-xs border border-navy-200 dark:border-navy-700">Enter</kbd> to send ·{" "}
              <kbd className="px-1 py-0.5 rounded bg-navy-100 dark:bg-navy-800 font-mono text-xs border border-navy-200 dark:border-navy-700">Shift+Enter</kbd> for new line
            </p>
          </div>
        </div>
      </main>
{/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
          <div className="relative bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-700 shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">

            <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100 dark:border-navy-800">
              <h2 className="font-display font-semibold text-lg text-navy-900 dark:text-cream-100">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="flex border-b border-navy-100 dark:border-navy-800 px-6">
              {[
                { id: "profile",     label: "Profile",     icon: User   },
                { id: "preferences", label: "Preferences", icon: Bell   },
                { id: "security",    label: "Security",    icon: Shield },
              ].map(tab => (
                <button key={tab.id} onClick={() => setSettingsTab(tab.id as any)}
                  className={cn("flex items-center gap-2 px-4 py-3 text-sm font-body font-medium border-b-2 transition-colors -mb-px",
                    settingsTab === tab.id
                      ? "border-accent-blue text-accent-blue"
                      : "border-transparent text-navy-500 dark:text-cream-400 hover:text-navy-900 dark:hover:text-cream-100")}>
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

              {/* ── PROFILE TAB ── */}
              {settingsTab === "profile" && (
                <>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-navy-50 dark:bg-navy-800/50 border border-navy-100 dark:border-navy-700">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {(profileForm.full_name || user?.email)?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-navy-900 dark:text-cream-100">
                        {profileForm.full_name || "Your Name"}
                      </p>
                      <p className="font-mono text-xs text-navy-400 dark:text-cream-500">{user?.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-xs border border-accent-blue/20">
                          Free plan
                        </span>
                        <button
                          onClick={() => { setShowSettings(false); router.push("/pricing"); }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
                        >
                          Upgrade →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Full Name</label>
                    <input type="text" value={profileForm.full_name}
                      onChange={e => setProfileForm(f => ({ ...f, full_name: e.target.value }))}
                      className="input" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Email</label>
                    <input type="email" value={user?.email || ""} disabled className="input opacity-50 cursor-not-allowed" />
                    <p className="font-body text-xs text-navy-400 mt-1">Email cannot be changed here.</p>
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Company</label>
                    <input type="text" value={profileForm.company}
                      onChange={e => setProfileForm(f => ({ ...f, company: e.target.value }))}
                      className="input" placeholder="Your company" />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Role</label>
                    <select value={profileForm.role}
                      onChange={e => setProfileForm(f => ({ ...f, role: e.target.value }))}
                      className="input">
                      <option value="">Select your role...</option>
                      {["Founder / CEO", "CTO / Engineering Lead", "Product Manager", "Engineering", "Marketing", "Sales", "Operations", "Other"].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={handleSaveProfile} disabled={savingProfile} className="btn-primary w-full py-3">
                    {savingProfile ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : "Save Profile"}
                  </button>
                </>
              )}

              {/* ── PREFERENCES TAB ── */}
              {settingsTab === "preferences" && (
                <div className="space-y-3">
                  {/* Dark mode toggle — free feature */}
                  <div className="flex items-center justify-between p-4 rounded-xl border border-navy-100 dark:border-navy-700 bg-navy-50/50 dark:bg-navy-800/30">
                    <div>
                      <p className="font-body font-medium text-navy-900 dark:text-cream-100 text-sm">Dark mode</p>
                      <p className="font-body text-xs text-navy-500 dark:text-cream-400 mt-0.5">Switch between light and dark theme</p>
                    </div>
                    <button onClick={toggleTheme}
                      className={cn("w-11 h-6 rounded-full transition-all relative flex-shrink-0",
                        theme === "dark" ? "bg-accent-blue" : "bg-navy-200 dark:bg-navy-700")}>
                      <div className={cn("w-4 h-4 rounded-full bg-white absolute top-1 transition-all",
                        theme === "dark" ? "left-6" : "left-1")} />
                    </button>
                  </div>

                  {/* Pro features with Upgrade button */}
                  {[
                    { label: "Weekly digest emails", desc: "Get a summary of your workspace activity every Monday"  },
                    { label: "AI insight alerts",    desc: "Get notified when Nexus detects something important"    },
                    { label: "Meeting summaries",    desc: "Receive email summaries after every meeting"            },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-navy-100 dark:border-navy-700 bg-navy-50/50 dark:bg-navy-800/30">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-body font-medium text-navy-900 dark:text-cream-100 text-sm">{item.label}</p>
                          <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-mono text-xs border border-amber-200 dark:border-amber-800">
                            Pro
                          </span>
                        </div>
                        <p className="font-body text-xs text-navy-500 dark:text-cream-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => { setShowSettings(false); router.push("/pricing"); }}
                        className="flex-shrink-0 ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-indigo text-white font-body text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                      >
                        Upgrade
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ── SECURITY TAB ── */}
              {settingsTab === "security" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-green-100 dark:border-green-900/40 bg-green-50/50 dark:bg-green-950/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Check size={14} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-body font-medium text-navy-900 dark:text-cream-100 text-sm">Account secured</p>
                        <p className="font-body text-xs text-navy-400 dark:text-cream-500">Protected with a password</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-body font-medium text-navy-900 dark:text-cream-100 text-sm mb-2">Change Password</p>
                    <a href="/forgot-password" className="btn-secondary w-full text-center py-2.5 text-sm block">
                      Send password reset email
                    </a>
                  </div>
                  <div className="p-4 rounded-xl border border-red-100 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20">
                    <p className="font-body font-medium text-red-700 dark:text-red-400 text-sm mb-1">Danger Zone</p>
                    <p className="font-body text-xs text-red-500 dark:text-red-400 mb-3">These actions cannot be undone.</p>
                    <button onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-body text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                      <LogOut size={14} /> Sign out of all devices
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INTEGRATIONS MODAL */}
      {showIntegrations && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowIntegrations(false)} />
          <div className="relative bg-white dark:bg-navy-900 rounded-2xl border border-navy-100 dark:border-navy-700 shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100 dark:border-navy-800">
              <div>
                <h2 className="font-display font-semibold text-lg text-navy-900 dark:text-cream-100">Integrations</h2>
                <p className="font-body text-xs text-navy-400 dark:text-cream-500">
                  {connectedTools.length} connected · {ALL_INTEGRATIONS.length - connectedTools.length} available
                </p>
              </div>
              <button onClick={() => setShowIntegrations(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-navy-400 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider px-2 mb-2">Connected</p>
              {integrations.filter(i => i.connected).map(integration => (
                <div key={integration.name} className="flex items-center justify-between p-3 rounded-xl border border-green-100 dark:border-green-900/40 bg-green-50/50 dark:bg-green-950/10">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{integration.icon}</span>
                    <div>
                      <p className="font-body font-medium text-navy-900 dark:text-cream-100 text-sm">{integration.name}</p>
                      <p className="font-body text-xs text-navy-400 dark:text-cream-500">{integration.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-mono text-xs">
                      <Check size={10} /> Connected
                    </span>
                    <button onClick={() => toggleIntegration(integration.name)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-navy-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}

              <p className="font-mono text-xs text-navy-400 dark:text-cream-500 uppercase tracking-wider px-2 mt-4 mb-2">Available</p>
              {integrations.filter(i => !i.connected).map(integration => (
                <div key={integration.name} className="flex items-center justify-between p-3 rounded-xl border border-navy-100 dark:border-navy-700 hover:border-navy-200 dark:hover:border-navy-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{integration.icon}</span>
                    <div>
                      <p className="font-body font-medium text-navy-900 dark:text-cream-100 text-sm">{integration.name}</p>
                      <p className="font-body text-xs text-navy-400 dark:text-cream-500">{integration.category}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleIntegration(integration.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent-blue/30 text-accent-blue font-body text-xs font-medium hover:bg-accent-blue/10 transition-colors">
                    <Plug size={11} /> Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}