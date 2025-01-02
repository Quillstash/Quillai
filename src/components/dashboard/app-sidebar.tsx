"use client";

import {  Feather } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

import { NavSecondary } from "./nav-secondary";
import { SubscriptionPlanCard } from "./subplan-card";
import { data } from "@/utils/sidebar-constants";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center gap-2 z-40 font-semibold text-lg hover:opacity-90 transition-opacity">
                  <Feather className="w-6 h-6 text-blue-600" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">QuillAI</span>
                  <span className="truncate text-xs">Article Generator</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col">
        <NavMain items={data.navMain} />
        <div className="mt-auto">
          <NavSecondary items={data.navSecondary} className="mb-8" />
          <div className="px-4 py-2">
            <SubscriptionPlanCard />
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
