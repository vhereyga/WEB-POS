"use client";

import React, { useState } from "react";
import { POPULAR_PRODUCTS, PopularProductItem } from "@/data/dashboardData";
import { Package, Laptop, Stethoscope, Sparkles, Monitor, ShieldCheck, ArrowRight } from "lucide-react";

export default function PopularProduct() {
  const [products] = useState<PopularProductItem[]>(POPULAR_PRODUCTS);

  const getProductIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("laptop") || lower.includes("asus")) {
      return <Laptop className="w-3.5 h-3.5 text-blue-600" />;
    }
    if (lower.includes("rhinotomy") || lower.includes("medical") || lower.includes("thermometer")) {
      return <Stethoscope className="w-3.5 h-3.5 text-rose-600" />;
    }
    if (lower.includes("monitor")) {
      return <Monitor className="w-3.5 h-3.5 text-purple-600" />;
    }
    if (lower.includes("glove") || lower.includes("mask")) {
      return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
    }
    return <Package className="w-3.5 h-3.5 text-amber-600" />;
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100/90 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Popular Product
              </h2>
              <p className="text-[11px] text-slate-400">
                Top selling items this period
              </p>
            </div>
          </div>

          <button
            id="view-all-products-btn"
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline group"
          >
            <span>Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100/80">
                <th className="py-2.5 font-semibold">Product ID</th>
                <th className="py-2.5 font-semibold">Item Name</th>
                <th className="py-2.5 font-semibold text-right">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="py-3 font-semibold text-slate-700">
                    <span className="font-mono text-slate-600 group-hover:text-red-600 transition-colors">
                      {item.id}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      {/* Product Thumbnail Placeholder */}
                      <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center shrink-0 shadow-2xs">
                        {getProductIcon(item.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 truncate max-w-[130px] sm:max-w-[160px]">
                          {item.name}
                        </p>
                        {item.category && (
                          <p className="text-[10px] text-slate-400 truncate">
                            {item.category}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        item.stock < 10
                          ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>6 Top ranked SKUs</span>
        <span className="text-emerald-600 font-medium">Stock Healthy</span>
      </div>
    </div>
  );
}
