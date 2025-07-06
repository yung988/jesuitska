"use client"

import { Calendar, Home, Users, Bed, CreditCard, Settings, BarChart3, MessageSquare, Star } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const menuItems = [
  {
    title: "Přehled",
    url: "#",
    icon: Home,
  },
  {
    title: "Rezervace",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Pokoje",
    url: "#",
    icon: Bed,
  },
  {
    title: "Hosté",
    url: "#",
    icon: Users,
  },
  {
    title: "Platby",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Statistiky",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Recenze",
    url: "#",
    icon: Star,
  },
  {
    title: "Zprávy",
    url: "#",
    icon: MessageSquare,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-amber-100">
      <SidebarHeader className="border-b border-amber-100 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600">
            <Bed className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Pension Luxury</h2>
            <p className="text-sm text-slate-500">Správa pensionu</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium mb-2">Hlavní menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={index === 0}
                    className="h-11 text-slate-700 hover:bg-amber-50 hover:text-amber-800 data-[active=true]:bg-gradient-to-r data-[active=true]:from-amber-50 data-[active=true]:to-amber-100 data-[active=true]:text-amber-800 data-[active=true]:border-r-2 data-[active=true]:border-amber-400"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-amber-100 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 hover:bg-amber-50">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-amber-100 text-amber-800">JN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-slate-800">Jana Nováková</span>
                  <span className="text-xs text-slate-500">Správce</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-10 text-slate-600 hover:bg-amber-50">
              <Settings className="h-4 w-4" />
              <span>Nastavení</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
