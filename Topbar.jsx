import React from "react";
import { Search, Bell, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-4 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-3 w-[420px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search tickets, users..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
          <UserCircle2 size={22} className="text-indigo-600" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">Agent</p>
            <p className="text-xs text-slate-500">agent@helpdesk.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}