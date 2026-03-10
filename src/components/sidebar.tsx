"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  Landmark,
  PieChart,
  LineChart,
  Rocket,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Savings",
    href: "/savings",
    icon: Wallet,
  },
  {
    name: "Bonds",
    href: "/bonds",
    icon: Landmark,
  },
  {
    name: "Index Funds",
    href: "/index-funds",
    icon: PieChart,
  },
  {
    name: "Stocks",
    href: "/stocks",
    icon: Rocket,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col gap-4 border-r bg-card/50 backdrop-blur-xl p-4 data-[state=collapsed]:w-16">
      <div className="flex h-[60px] items-center gap-2 px-2 font-semibold">
        <LineChart className="h-6 w-6 text-primary" />
        <span className="text-lg bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
          RiskDash
        </span>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto px-2 pb-4 text-xs text-muted-foreground">
        © 2026 Personal Finance
      </div>
    </div>
  );
}
