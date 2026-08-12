"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DailySellingActivity from "@/components/DailySellingActivity";
import LatestTransaction from "@/components/LatestTransaction";
import PopularProduct from "@/components/PopularProduct";
import StockReceiptIssued from "@/components/StockReceiptIssued";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [activeTab, setActiveTab] = useState<string>("General");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800">
      {/* Left Sidebar Navigation */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen transition-all duration-300">
        {/* Top Header */}
        <Header
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        {/* Dashboard Main View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Daily Selling Activity Card (Top Full-Width) */}
          <section aria-label="Selling Activity">
            <DailySellingActivity selectedYear={selectedYear} />
          </section>

          {/* 3 Bottom Columns (Latest Transaction, Popular Product, Stock Receipt / Issued) */}
          <section
            aria-label="Dashboard Details"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
          >
            <div className="h-full">
              <LatestTransaction />
            </div>
            <div className="h-full">
              <PopularProduct />
            </div>
            <div className="h-full">
              <StockReceiptIssued />
            </div>
          </section>
        </main>

        {/* Footer info */}
        <footer className="px-6 py-4 border-t border-slate-100 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2024 WEB POS. Point of Sales System.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> All Systems Operational
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
