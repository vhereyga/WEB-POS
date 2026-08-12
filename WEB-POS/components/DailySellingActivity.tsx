"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreHorizontal, TrendingUp, Download, RefreshCw } from "lucide-react";
import { HOURLY_SALES_DATA, SALES_TOTALS } from "@/data/dashboardData";

interface DailySellingActivityProps {
  selectedYear: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { time: string; orders: number } }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs">
        <p className="font-semibold text-slate-300 mb-1">{`Time: ${label}`}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span className="text-slate-400">Sales:</span>
          <span className="font-bold text-white">${payload[0].value.toFixed(2)}</span>
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          {payload[0].payload.orders} Transactions
        </div>
      </div>
    );
  }
  return null;
};

export default function DailySellingActivity({
  selectedYear,
}: DailySellingActivityProps) {
  const [activeFilter, setActiveFilter] = useState<"Today" | "Week" | "Month">("Today");
  const [showMenu, setShowMenu] = useState(false);

  const rawData = HOURLY_SALES_DATA[selectedYear] || HOURLY_SALES_DATA["2024"];
  const totalAmount = SALES_TOTALS[selectedYear] || "$2,420.22";

  // Multiplier for filter preview
  const chartData = rawData.map((item) => {
    let multiplier = 1;
    if (activeFilter === "Week") multiplier = 1.35;
    if (activeFilter === "Month") multiplier = 1.8;
    return {
      time: item.time,
      sales: Math.round(item.sales * multiplier),
      orders: Math.round(item.orders * multiplier),
    };
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100/90 shadow-xs relative overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Daily Selling Activity
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
              <TrendingUp className="w-3 h-3" /> +14.8%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time hourly revenue distribution ({selectedYear})
          </p>
        </div>

        {/* Amount & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          {/* Time range pills */}
          <div className="flex items-center bg-slate-100/70 p-0.5 rounded-xl text-xs font-medium">
            {(["Today", "Week", "Month"] as const).map((period) => (
              <button
                key={period}
                id={`filter-${period.toLowerCase()}`}
                onClick={() => setActiveFilter(period)}
                className={`px-3 py-1 rounded-lg transition-all text-xs font-semibold ${
                  activeFilter === period
                    ? "bg-white text-red-600 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {totalAmount}
              </span>
            </div>

            {/* 3-dot options menu */}
            <div className="relative">
              <button
                id="daily-selling-menu-button"
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                aria-label="Daily selling options"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 animate-in fade-in-50 zoom-in-95 duration-100 text-xs text-slate-700">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export CSV Data</span>
                  </button>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sync POS Feeds</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Line & Gradient Area Chart with explicit pixel height */}
      <div className="w-full" style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#F1F5F9" }}
              dy={8}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#DC2626"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#salesGradient)"
              dot={{
                r: 3.5,
                fill: "#DC2626",
                strokeWidth: 2,
                stroke: "#FFFFFF",
              }}
              activeDot={{
                r: 5.5,
                fill: "#DC2626",
                stroke: "#FFFFFF",
                strokeWidth: 2.5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
