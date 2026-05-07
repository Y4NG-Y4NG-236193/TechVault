'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowUpRight,
  ArrowDownRight,
  Box,
  ShoppingCart,
  Zap,
  TrendingUp,
  Loader2
} from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$12,450.00",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    name: "Active Workflows",
    value: "24",
    change: "+2 since yesterday",
    trend: "up",
    icon: Zap,
    color: "bg-[#bef264]/10 text-[#bef264]",
  },
  {
    name: "Pending Orders",
    value: "156",
    change: "-4%",
    trend: "down",
    icon: ShoppingCart,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    name: "Stock Alerts",
    value: "8",
    change: "3 critical",
    trend: "down",
    icon: Box,
    color: "bg-rose-500/10 text-rose-500",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/pages/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#bef264] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-black text-[#fafafa] tracking-tight uppercase">Dashboard Overview</h1>
        <p className="text-zinc-500 mt-1">Welcome back, Administrator. Infrastructure status is nominal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="group p-6 bg-[#18181b] rounded-3xl border border-zinc-800 transition-all hover:shadow-2xl hover:shadow-[#bef264]/5 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`flex items-center text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${stat.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                }`}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 mb-1 uppercase tracking-widest">{stat.name}</p>
              <p className="text-2xl font-black text-[#fafafa]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 aspect-video bg-[#18181b] rounded-3xl border border-zinc-800 flex items-center justify-center border-dashed">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#09090b] text-zinc-700 mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Network Traffic Analysis</p>
          </div>
        </div>
        <div className="bg-[#18181b] rounded-3xl border border-zinc-800 p-8">
          <h3 className="font-black text-[#fafafa] mb-6 uppercase text-sm tracking-widest">System Logs</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#09090b] shrink-0" />
                <div className="space-y-1">
                  <div className="h-4 w-32 bg-[#09090b] rounded" />
                  <div className="h-3 w-20 bg-[#09090b]/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
