"use client";

import React from "react";
import {
  LayoutDashboard,
  Store,
  ReceiptText,
  PackageCheck,
  Layers,
  Tag,
  Scale,
  DollarSign,
  ShoppingBag,
  Truck,
  FileSpreadsheet,
  BarChart3,
  Users,
  X,
  Sparkles,
} from "lucide-react";
import { MAIN_MENU_ITEMS, INVENTORY_MENU_ITEMS, NavItem } from "@/data/dashboardData";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Store,
  ReceiptText,
  PackageCheck,
  Layers,
  Tag,
  Scale,
  DollarSign,
  ShoppingBag,
  Truck,
  FileSpreadsheet,
  BarChart3,
  Users,
};

export default function Sidebar({
  activeMenu = "Dashboard",
  setActiveMenu,
  isOpen,
  onClose,
}: SidebarProps) {
  const renderMenuItem = (item: NavItem) => {
    const Icon = ICON_MAP[item.iconName] || LayoutDashboard;
    const isDashboard = item.name === "Dashboard" && !item.disabled;
    const isActive = isDashboard && activeMenu === "Dashboard";

    if (isDashboard) {
      return (
        <button
          key={item.name}
          id="sidebar-item-dashboard"
          type="button"
          onClick={() => {
            setActiveMenu("Dashboard");
            if (typeof window !== "undefined" && window.innerWidth < 1024) {
              onClose();
            }
          }}
          className={`w-full flex items-center justify-between px-6 py-3.5 text-sm font-medium transition-all duration-150 relative text-left cursor-pointer group ${
            isActive
              ? "bg-red-50/80 text-red-600 font-semibold"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <Icon
              className={`w-[18px] h-[18px] transition-colors ${
                isActive
                  ? "text-red-600"
                  : "text-slate-400 group-hover:text-slate-600"
              }`}
            />
            <span className="tracking-tight">{item.name}</span>
          </div>

          {/* Right Active Indicator */}
          {isActive && (
            <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-red-600 rounded-l-sm" />
          )}
        </button>
      );
    }

    // Completely non-navigational element for all non-Dashboard items
    return (
      <div
        key={item.name}
        id={`sidebar-item-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
        className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-150 relative text-left cursor-default group"
      >
        <div className="flex items-center gap-3.5">
          <Icon className="w-[18px] h-[18px] text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
          <span className="tracking-tight">{item.name}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Header / Brand Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100/80 shrink-0">
          <div className="flex items-center gap-3">
            {/* WEB POS Emblem */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md shadow-red-500/20 ring-2 ring-red-100">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                aria-hidden="true"
              >
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 3.18l6 3.33v4.61c0 4.14-2.73 8.04-6 9.17-3.27-1.13-6-5.03-6-9.17V8.51l6-3.33zM11 9h2v4h-2zm0 6h2v2h-2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-extrabold tracking-tight text-slate-900 leading-tight">
                WEB POS
              </span>
              <span className="text-[11px] font-medium text-slate-400">
                Point of Sales
              </span>
            </div>
          </div>

          {/* Close button for Mobile */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 select-none">
          {/* Main Menu */}
          <div>
            <div className="space-y-0.5">
              {MAIN_MENU_ITEMS.map(renderMenuItem)}
            </div>
          </div>

          {/* INVENTORY Section */}
          <div>
            <div className="px-6 pb-2 pt-1">
              <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                INVENTORY
              </p>
            </div>
            <div className="space-y-0.5">
              {INVENTORY_MENU_ITEMS.map(renderMenuItem)}
            </div>
          </div>
        </div>

        {/* Sidebar Footer System Status */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">
                POS Terminal #01
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                Online • Sync Active
              </p>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
      </aside>
    </>
  );
}
