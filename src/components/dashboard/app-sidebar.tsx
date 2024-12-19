"use client";

import { Command } from "lucide-react";
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Quillstash</span>
                  <span className="truncate text-xs">Article Gen</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col">
        <NavMain items={data.navMain} />
        <div className="mt-auto">
          <div className="px-4 py-2">
            <SubscriptionPlanCard currentArticles={3} maxArticles={3} />
          </div>
          <NavSecondary items={data.navSecondary} />
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}


