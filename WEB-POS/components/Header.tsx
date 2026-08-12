"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  Bell,
  Search,
  Check,
  Calendar,
} from "lucide-react";
import { USER_PROFILE } from "@/data/dashboardData";

interface HeaderProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSidebar: () => void;
}

const AVAILABLE_YEARS = ["2024", "2023", "2025", "2026"];
const NAV_TABS = ["General", "Inventory", "Cashier"];

export default function Header({
  selectedYear,
  setSelectedYear,
  activeTab,
  setActiveTab,
  onOpenSidebar,
}: HeaderProps) {
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsYearDropdownOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button + Title + Sub Navigation */}
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            id="mobile-sidebar-toggle"
            onClick={onOpenSidebar}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              DASHBOARD
            </h1>

            {/* Sub-navigation tabs: General */}
            <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-100/80 p-1 rounded-xl">
              {NAV_TABS.map((tab) => {
                const isGeneral = tab === "General";
                const isActive = isGeneral && activeTab === "General";

                if (isGeneral) {
                  return (
                    <button
                      key={tab}
                      id={`nav-tab-${tab.toLowerCase()}`}
                      onClick={() => setActiveTab("General")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                        isActive
                          ? "bg-white text-red-600 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                }

                return (
                  <div
                    key={tab}
                    id={`nav-tab-${tab.toLowerCase()}`}
                    className="px-3 py-1 text-xs font-semibold rounded-lg text-slate-500 cursor-default select-none"
                  >
                    {tab}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Side: Year Dropdown & User Profile */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Year Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="year-dropdown-button"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedYear}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  isYearDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Year Dropdown Menu */}
            {isYearDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Year
                </div>
                {AVAILABLE_YEARS.map((year) => (
                  <button
                    key={year}
                    id={`select-year-${year}`}
                    onClick={() => {
                      setSelectedYear(year);
                      setIsYearDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-slate-50 transition-colors ${
                      selectedYear === year
                        ? "text-red-600 font-semibold bg-red-50/50"
                        : "text-slate-700"
                    }`}
                  >
                    <span>{year}</span>
                    {selectedYear === year && (
                      <Check className="w-3.5 h-3.5 text-red-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Notification Bell */}
          <button
            id="notifications-button"
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors hidden sm:flex items-center justify-center"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              id="user-profile-button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-50 transition-colors text-left"
            >
              {/* Circular Avatar with Initials "JS" */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-red-100">
                {USER_PROFILE.initials}
              </div>

              {/* Name and Role */}
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {USER_PROFILE.name}
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {USER_PROFILE.role}
                </span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800">
                    {USER_PROFILE.name}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {USER_PROFILE.email}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold text-red-600 bg-red-50 rounded-md">
                    {USER_PROFILE.role}
                  </span>
                </div>
                <div className="py-1 text-xs text-slate-600">
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors"
                  >
                    System Settings
                  </button>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors"
                  >
                    Switch Cashier Register
                  </button>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 text-red-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
