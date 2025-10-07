"use client"

import {
  BarChart3,
  Building2,
  DollarSign,
  Home,
  MapPin,
  Package2,
  Settings,
  ShoppingCart,
  Users,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
      current: pathname === "/",
    },
    {
      name: "Đơn hàng",
      href: "/orders",
      icon: ShoppingCart,
      current: pathname === "/orders",
      badge: "3,456",
    },
    {
      name: "Quán ăn",
      href: "/restaurants",
      icon: Building2,
      current: pathname === "/restaurants",
      badge: "28",
    },
    {
      name: "Sinh viên",
      href: "/students",
      icon: Users,
      current: pathname === "/students",
      badge: "8,240",
    },
    {
      name: "Khu vực KTX",
      href: "/zones",
      icon: MapPin,
      current: pathname === "/zones",
    },
    {
      name: "Phản hồi & Đánh giá",
      href: "/feedback",
      icon: MessageSquare,
      current: pathname === "/feedback",
      badge: "12",
    },
    {
      name: "Báo cáo & Phân tích",
      href: "/analytics",
      icon: BarChart3,
      current: pathname === "/analytics",
    },
  ]

  const tools = [
    {
      name: "Hoa hồng",
      href: "/commission",
      icon: DollarSign,
      current: pathname === "/commission",
    },
    {
      name: "Cài đặt",
      href: "/settings",
      icon: Settings,
      current: pathname === "/settings",
    },
  ]

  return (
    <div className="hidden w-64 bg-white border-r border-gray-200 lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6F61] rounded-lg flex items-center justify-center">
              <Package2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">KTX Food</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">MAIN MENU</div>

          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg ${
                  item.current ? "text-white bg-[#FF6F61]" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-600">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}

          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-8 mb-4">TOOLS</div>

          {tools.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg ${
                  item.current ? "text-white bg-[#FF6F61]" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
