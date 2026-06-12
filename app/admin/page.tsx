"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import {
  Users, MessageSquare, Plug, FileText,
  Mail, TrendingUp, Shield, LogOut,
  ChevronDown, ChevronUp, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "alabims10@gmail.com";

export default function AdminPage() {
  const router   = useRouter();
  const supabase = createClient();

  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [stats, setStats]           = useState<any>(null);
  const [users, setUsers]           = useState<any[]>([]);
  const [waitlist, setWaitlist]     = useState<any[]>([]);
  const [activeTab, setActiveTab]   = useState<"overview"|"users"|"waitlist">("overview");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  async function checkAdminAndLoad() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/login"); return; }
    if (session.user.email !== ADMIN_EMAIL) {
      setError("Access denied. Admin only.");
      setLoading(false);
      return;
    }
    loadStats(session.access_token);
  }

  async function loadStats(token?: string) {
    setRefreshing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = token || session?.access_token;

      const res  = await fetch("/api/admin/stats", {
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStats(data.stats);
      setUsers(data.users);
      setWaitlist(data.waitlist);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-body text-cream-400 text-sm">Loading admin panel...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <div className="text-center">
        <Shield size={48} className="text-red-500 mx-auto mb-4" />
        <h1 className="font-display text-2xl text-cream-100 mb-2">Access Denied</h1>
        <p className="font-body text-cream-400 text-sm mb-6">{error}</p>
        <button onClick={() => router.push("/")} className="btn-primary">Go Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-navy-950 text-cream-100">

      {/* Header */}
      <div className="border-b border-navy-800 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-semibold text-cream-100">Sypora AI — Admin</h1>
              <p className="font-mono text-xs text-cream-500">Internal dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => loadStats()} disabled={refreshing}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-navy-700 text-cream-400 hover:bg-navy-800 transition-colors text-sm font-body">
              <RefreshCw size={13} className={cn(refreshing && "animate-spin")} />
              Refresh
            </button>
            <button onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-navy-700 text-cream-400 hover:bg-navy-800 transition-colors text-sm font-body">
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Users",        value: stats?.total_users,         icon: Users,         color: "text-blue-400"   },
            { label: "Active Integrations", value: stats?.active_integrations, icon: Plug,          color: "text-green-400"  },
            { label: "Conversations",       value: stats?.total_conversations, icon: MessageSquare, color: "text-purple-400" },
            { label: "Pages Indexed",       value: stats?.total_indexed,       icon: FileText,      color: "text-amber-400"  },
            { label: "Waitlist",            value: stats?.waitlist_count,      icon: Mail,          color: "text-pink-400"   },
          ].map((stat, i) => (
            <div key={i} className="bg-navy-900 border border-navy-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-body text-xs text-cream-500">{stat.label}</p>
                <stat.icon size={16} className={stat.color} />
              </div>
              <p className="font-display text-2xl font-bold text-cream-100">{stat.value ?? 0}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-navy-900 border border-navy-800 rounded-xl p-1 w-fit">
          {[
            { id: "overview", label: "Overview"  },
            { id: "users",    label: "Users"     },
            { id: "waitlist", label: "Waitlist"  },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-body font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-accent-blue text-white"
                  : "text-cream-400 hover:text-cream-100"
              )}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent users */}
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-cream-100 mb-4 flex items-center gap-2">
                <Users size={16} className="text-accent-blue" /> Recent Signups
              </h3>
              <div className="space-y-3">
                {users.slice(0, 5).map(user => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-bold text-xs">
                        {(user.name !== "—" ? user.name : user.email)?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-body text-sm text-cream-100">{user.name !== "—" ? user.name : user.email}</p>
                        <p className="font-mono text-xs text-cream-500">{new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.integrations.map((int: string) => (
                        <span key={int} className="px-2 py-0.5 rounded-full bg-green-900/30 text-green-400 font-mono text-xs">
                          {int}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration breakdown */}
            <div className="bg-navy-900 border border-navy-800 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-cream-100 mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-accent-blue" /> Integration Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(
                  users.flatMap(u => u.integrations).reduce((acc: any, int: string) => {
                    acc[int] = (acc[int] || 0) + 1;
                    return acc;
                  }, {})
                ).sort(([,a]: any, [,b]: any) => b - a).map(([name, count]: any) => (
                  <div key={name} className="flex items-center justify-between">
                    <p className="font-body text-sm text-cream-300 capitalize">{name.replace("_", " ")}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-blue rounded-full"
                          style={{ width: `${Math.min((count / users.length) * 100, 100)}%` }} />
                      </div>
                      <span className="font-mono text-xs text-cream-400 w-6 text-right">{count}</span>
                    </div>
                  </div>
                ))}
                {users.every(u => u.integrations.length === 0) && (
                  <p className="font-body text-sm text-cream-500">No integrations yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users tab */}
        {activeTab === "users" && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-navy-800">
              <h3 className="font-display font-semibold text-cream-100">All Users ({users.length})</h3>
            </div>
            <div className="divide-y divide-navy-800">
              {users.map(user => (
                <div key={user.id}>
                  <div
                    onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                    className="flex items-center justify-between px-5 py-4 hover:bg-navy-800/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {(user.name !== "—" ? user.name : user.email)?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-body font-medium text-cream-100 text-sm">
                          {user.name !== "—" ? user.name : "No name"}
                        </p>
                        <p className="font-mono text-xs text-cream-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-cream-500">
                        <span>{user.conversations} chats</span>
                        <span>{user.pages_indexed} pages</span>
                        <span>{user.integrations.length} tools</span>
                      </div>
                      <span className="font-mono text-xs text-cream-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                      {expandedUser === user.id
                        ? <ChevronUp size={14} className="text-cream-400" />
                        : <ChevronDown size={14} className="text-cream-400" />}
                    </div>
                  </div>
                  {expandedUser === user.id && (
                    <div className="px-5 pb-4 bg-navy-800/30">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                        {[
                          { label: "Company",      value: user.company      },
                          { label: "Role",         value: user.role         },
                          { label: "Last Sign In", value: user.last_sign_in ? new Date(user.last_sign_in).toLocaleDateString() : "Never" },
                          { label: "User ID",      value: user.id.slice(0, 8) + "..." },
                        ].map((item, i) => (
                          <div key={i} className="bg-navy-900 rounded-xl p-3">
                            <p className="font-mono text-xs text-cream-500 mb-1">{item.label}</p>
                            <p className="font-body text-sm text-cream-200 truncate">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      {user.integrations.length > 0 && (
                        <div className="mt-3">
                          <p className="font-mono text-xs text-cream-500 mb-2">Connected Tools</p>
                          <div className="flex flex-wrap gap-2">
                            {user.integrations.map((int: string) => (
                              <span key={int} className="px-2.5 py-1 rounded-full bg-green-900/30 border border-green-800 text-green-400 font-mono text-xs capitalize">
                                {int.replace("_", " ")}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Waitlist tab */}
        {activeTab === "waitlist" && (
          <div className="bg-navy-900 border border-navy-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-navy-800">
              <h3 className="font-display font-semibold text-cream-100">Waitlist ({waitlist.length})</h3>
            </div>
            <div className="divide-y divide-navy-800">
              {waitlist.length === 0 && (
                <p className="px-5 py-8 text-center font-body text-cream-500 text-sm">No waitlist signups yet</p>
              )}
              {waitlist.map((entry, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-navy-800 flex items-center justify-center">
                      <Mail size={12} className="text-cream-400" />
                    </div>
                    <p className="font-body text-sm text-cream-200">{entry.email}</p>
                  </div>
                  <p className="font-mono text-xs text-cream-500">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

