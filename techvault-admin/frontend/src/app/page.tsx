import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Box,
  ShoppingCart,
  Zap,
  TrendingUp
} from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "$12,450.00",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Active Workflows",
    value: "24",
    change: "+2 since yesterday",
    trend: "up",
    icon: Zap,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Pending Orders",
    value: "156",
    change: "-4%",
    trend: "down",
    icon: ShoppingCart,
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "Stock Alerts",
    value: "8",
    change: "3 critical",
    trend: "down",
    icon: Box,
    color: "bg-rose-50 text-rose-600",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Adrian. Here&apos;s what&apos;s happening with TechVault today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="group p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                }`}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 aspect-video bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center border-dashed">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-gray-500 font-medium">Analytics Visualization Placeholder</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h3 className="font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-gray-50 shrink-0" />
                <div className="space-y-1">
                  <div className="h-4 w-32 bg-gray-50 rounded" />
                  <div className="h-3 w-20 bg-gray-50/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
