"use client";

import React, { useState } from "react";
import { STOCK_EVENTS, StockEventItem } from "@/data/dashboardData";
import { ArrowDownLeft, ArrowUpRight, Boxes, ArrowRight } from "lucide-react";

export default function StockReceiptIssued() {
  const [events] = useState<StockEventItem[]>(STOCK_EVENTS);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Stock Receipt / Issued
              </h2>
              <p className="text-[11px] text-slate-400">
                Inventory movement logs
              </p>
            </div>
          </div>

          <button
            id="view-all-stock-logs-btn"
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline group"
          >
            <span>Logs</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100/80">
                <th className="py-2.5 font-semibold">Timestamp</th>
                <th className="py-2.5 font-semibold">Item Name</th>
                <th className="py-2.5 font-semibold text-right">Event</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {events.map((evt, idx) => (
                <tr
                  key={`${evt.timestamp}-${idx}`}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="py-3 text-slate-500 whitespace-nowrap">
                    {evt.timestamp}
                  </td>
                  <td className="py-3">
                    <p className="font-medium text-slate-800 truncate max-w-[140px] sm:max-w-[170px] group-hover:text-red-600 transition-colors">
                      {evt.name}
                    </p>
                  </td>
                  <td className="py-3 text-right">
                    {evt.event === "In" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                        <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                        In
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/60 shadow-2xs">
                        <ArrowUpRight className="w-3 h-3 text-rose-600" />
                        Out
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Recent movements</span>
        <span className="text-slate-500 font-medium">Warehouse A</span>
      </div>
    </div>
  );
}
