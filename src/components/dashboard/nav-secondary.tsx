import { useState } from "react"
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { type LucideIcon } from 'lucide-react'
import type * as React from "react"
import { FeedbackCard } from "../feedback"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title === "Help & Support" ? (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <SidebarMenuButton size="lg">
                      <item.icon className="text-blue-500"/>
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="text-lg text-center font-semibold mb-4">
                      Help & Support
                    </DialogTitle>
                    <FeedbackCard />
                  </DialogContent>
                </Dialog>
              ) : (
                <SidebarMenuButton asChild size="lg">
                  <a href={item.url}>
                    <item.icon className="text-blue-500"/>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}