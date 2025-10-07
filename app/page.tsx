"use client"
import {
  Building2,
  DollarSign,
  Search,
  ShoppingCart,
  Users,
  Bell,
  Filter,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

import { TimeChart } from "@/components/time-chart"
import { RevenueComparison } from "@/components/revenue-comparison"
import { KTXInsights } from "@/components/ktx-insights"

export default function AdminDashboard() {
  // Mock data
  const stats = {
    totalRevenue: "847,500",
    totalOrders: "3,456",
    activeRestaurants: "28",
    activeUsers: "8,240",
    avgOrderValue: "24,500",
    commissionRate: "10%",
  }

  const recentOrders = [
    {
      id: "KTX001",
      customer: "Nguyễn Văn A",
      restaurant: "Cơm Tấm Cô Ba",
      zone: "Tòa A1 - Phòng 205",
      amount: "28,000",
      commission: "2,800",
      status: "Completed",
      time: "5 phút trước",
      avatar: "NA",
      deliveryTime: "12 phút",
    },
    {
      id: "KTX002",
      customer: "Trần Thị B",
      restaurant: "Bánh Mì Chảo 3K",
      zone: "Tòa B2 - Phòng 314",
      amount: "15,000",
      commission: "1,500",
      status: "In Progress",
      time: "8 phút trước",
      avatar: "TB",
      deliveryTime: "Đang giao",
    },
    {
      id: "KTX003",
      customer: "Lê Minh C",
      restaurant: "Trà Sữa Gong Cha Mini",
      zone: "Tòa C1 - Phòng 108",
      amount: "22,000",
      commission: "2,200",
      status: "Completed",
      time: "12 phút trước",
      avatar: "LC",
      deliveryTime: "8 phút",
    },
    {
      id: "KTX004",
      customer: "Phạm Thị D",
      restaurant: "Phở Hà Nội Mini",
      zone: "Tòa D1 - Phòng 421",
      amount: "35,000",
      commission: "3,500",
      status: "Pending",
      time: "15 phút trước",
      avatar: "PD",
      deliveryTime: "Chờ xác nhận",
    },
  ]

  const topRestaurants = [
    { name: "Cơm Tấm Cô Ba", orders: 234, revenue: "5,850,000", rating: 4.8, growth: "+18%", avgDelivery: "11 phút" },
    { name: "Bánh Mì Chảo 3K", orders: 189, revenue: "2,835,000", rating: 4.6, growth: "+12%", avgDelivery: "8 phút" },
    {
      name: "Trà Sữa Gong Cha Mini",
      orders: 156,
      revenue: "3,432,000",
      rating: 4.9,
      growth: "+25%",
      avgDelivery: "6 phút",
    },
    { name: "Phở Hà Nội Mini", orders: 143, revenue: "5,005,000", rating: 4.7, growth: "+15%", avgDelivery: "14 phút" },
  ]

  const analyticsData = [
    { month: "T1", orders: 1240, revenue: 30360000, commission: 3036000 },
    { month: "T2", orders: 1456, revenue: 35672000, commission: 3567200 },
    { month: "T3", orders: 1789, revenue: 43829000, commission: 4382900 },
    { month: "T4", orders: 2134, revenue: 52284000, commission: 5228400 },
    { month: "T5", orders: 2567, revenue: 62892000, commission: 6289200 },
    { month: "T6", orders: 2891, revenue: 70829000, commission: 7082900 },
    { month: "T7", orders: 3456, revenue: 84672000, commission: 8467200 },
  ]

  const zoneData = [
    { zone: "Tòa A1-A2", orders: 892, revenue: 21808000 },
    { zone: "Tòa B1-B2", orders: 756, revenue: 18522000 },
    { zone: "Tòa C1-C2", orders: 834, revenue: 20434000 },
    { zone: "Tòa D1-D2", orders: 974, revenue: 23908000 },
  ]

  const timeData = [
    { time: "11:00-13:00", value: 35, orders: 432 },
    { time: "17:00-19:00", value: 42, orders: 518 },
    { time: "19:00-21:00", value: 18, orders: 222 },
    { time: "Khác", value: 5, orders: 62 },
  ]

  const COLORS = ["#FF6F61", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"]

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Quản lý nền tảng giao đồ ăn nội khu KTX khu B - ĐHQG-HCM</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Tìm kiếm..." className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white" />
          </div>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button size="sm" className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Thêm mới
          </Button>

          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue}đ</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+12%</span>
                    <span className="text-sm text-gray-500 ml-1">vs tháng trước</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+8.2%</span>
                    <span className="text-sm text-gray-500 ml-1">vs tháng trước</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Quán ăn hoạt động</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeRestaurants}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+3</span>
                    <span className="text-sm text-gray-500 ml-1">quán mới</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-[#FF6F61]/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-[#FF6F61]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sinh viên hoạt động</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+15.3%</span>
                    <span className="text-sm text-gray-500 ml-1">vs tháng trước</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics */}
          <Card className="lg:col-span-2 bg-white border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Analytics</CardTitle>
                  <CardDescription className="text-gray-500">Thống kê đơn hàng theo thời gian</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Tháng này
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Tuần này</DropdownMenuItem>
                      <DropdownMenuItem>Tháng này</DropdownMenuItem>
                      <DropdownMenuItem>Quý này</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData}>
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF6F61" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#FF6F61" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value, name) => [
                        name === "orders" ? `${value} đơn` : `${value.toLocaleString()}đ`,
                        name === "orders" ? "Đơn hàng" : "Doanh thu",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="#FF6F61"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="space-y-6">
            <Card className="bg-white border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Chỉ số chính</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Giá trị đơn hàng TB</p>
                    <p className="text-xl font-bold text-gray-900">{stats.avgOrderValue}đ</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <ArrowDownRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">-40%</span>
                    </div>
                    <p className="text-xs text-gray-500">vs app truyền thống</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tỷ lệ hoa hồng</p>
                    <p className="text-xl font-bold text-green-600">{stats.commissionRate}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <ArrowDownRight className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">-20%</span>
                    </div>
                    <p className="text-xs text-gray-500">vs GrabFood</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Khu vực hoạt động</span>
                  </div>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={zoneData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: "#6b7280" }}
                        />
                        <YAxis
                          type="category"
                          dataKey="zone"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6b7280" }}
                          width={50}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value) => [`${value} đơn`, "Số đơn hàng"]}
                        />
                        <Bar dataKey="orders" fill="#FF6F61" radius={[0, 4, 4, 0]} opacity={0.8} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time Chart */}
          <TimeChart />
        </div>

        {/* Recent Orders & Top Restaurants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</CardTitle>
                  <CardDescription className="text-gray-500">Danh sách đơn hàng mới nhất</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61] text-sm font-medium">
                          {order.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">
                          {order.restaurant} • {order.zone}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{order.amount}đ</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {order.status === "Completed"
                            ? "Hoàn thành"
                            : order.status === "In Progress"
                              ? "Đang giao"
                              : "Chờ xử lý"}
                        </Badge>
                        <Clock className="h-3 w-3 text-gray-400" />
                      </div>
                      {order.deliveryTime && <p className="text-xs text-gray-500 mt-1">{order.deliveryTime}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Restaurants */}
          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Top quán ăn</CardTitle>
                  <CardDescription className="text-gray-500">Quán ăn có hiệu suất tốt nhất</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Xem tất cả
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRestaurants.map((restaurant, index) => (
                  <div key={restaurant.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FF6F61]/10 text-[#FF6F61] rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{restaurant.name}</p>
                        <div className="flex items-center gap-2">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-500">{restaurant.rating}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{restaurant.orders} đơn</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{restaurant.revenue}đ</p>
                      <div className="flex items-center">
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                        <span className="text-sm text-green-500 font-medium">{restaurant.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Revenue Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueComparison />
          <TimeChart />
        </div>
        {/* KTX Insights */}
        <KTXInsights />
      </main>
    </div>
  )
}
