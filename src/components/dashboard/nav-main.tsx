"use client";

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Settings2, Sparkles, Users2 } from "lucide-react";
import Link from "next/link";

const items = [
  {
    name: "Articles",
    url: "/dashboard/articles",
    icon: Users2,
  },
  {
    name: "Generate",
    url: "/dashboard/generate",
    icon: Sparkles,
  },
  {
    name: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuButton asChild>
              <Link href={item.url} className="hover:bg-muted">
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}