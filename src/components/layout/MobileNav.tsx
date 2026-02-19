"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { config } from "@/config/prospect";
import { BarChart3, Info, GitBranch, Menu, X } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/about", label: "About ALDC", icon: Info },
  { href: "/data-flow", label: "Data Flow", icon: GitBranch },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div className="flex h-14 items-center justify-between bg-sidebar px-4">
        <img
          src={config.logoPath}
          alt={config.name}
          className="h-7 max-w-[120px] object-contain"
        />
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-sidebar-foreground/70 hover:bg-sidebar-muted"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground shadow-2xl">
            <div className="flex h-14 items-center px-6 border-b border-white/10">
              <img
                src={config.logoPath}
                alt={config.name}
                className="h-7 max-w-[120px] object-contain"
              />
            </div>
            <nav className="px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <img src="/aldc-icon.svg" alt="ALDC" className="h-5 w-5" />
                <p className="text-xs text-sidebar-foreground/50">Powered by ALDC</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
