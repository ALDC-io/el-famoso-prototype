"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { config } from "@/config/prospect";
import { BarChart3, DollarSign, Database, Plug, Sparkles, MessageSquare } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/dashboard/profit", label: "Profitability", icon: DollarSign },
  { href: "/dashboard/warehouse", label: "Warehouse", icon: Database },
  { href: "/dashboard/sources", label: "Source Health", icon: Plug },
  { href: "/why-aldc", label: "Why ALDC", icon: Sparkles },
  { href: "/chat", label: "Zeus Chat", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-sidebar text-sidebar-foreground">
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/10">
        <img
          src={config.logoPath}
          alt={config.name}
          className="h-8 max-w-[140px] object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-muted hover:text-sidebar-foreground"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/aldc-icon.svg" alt="ALDC" className="h-5 w-5" />
          <div>
            <p className="text-xs font-medium text-sidebar-foreground/80">Powered by ALDC</p>
            <p className="text-[10px] text-sidebar-foreground/40">Eclipse + Zeus</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
