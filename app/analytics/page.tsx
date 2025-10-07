"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Clock, Download } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7days")
  const [metric, setMetric] = useState("orders")

  // Mock data for different time ranges
  const weeklyData = [
    { date: "T2", orders: 456, revenue: 11200000, users: 234, avgOrder: 24561 },
    { date: "T3", orders: 523, revenue: 12890000, users: 267, avgOrder: 24636 },
    { date: "T4", orders: 612, revenue: 15080000, users: 298, avgOrder: 24641 },
    { date: "T5", orders: 589, revenue: 14520000, users: 287, avgOrder: 24653 },
    { date: "T6", orders: 734, revenue: 18100000, users: 356, avgOrder: 24659 },
    { date: "T7", orders: 892, revenue: 22010000, users: 423, avgOrder: 24674 },
    { date: "CN", orders: 678, revenue: 16720000, users: 334, avgOrder: 24645 },
  ]

  const monthlyData = [
    { month: "T1", orders: 12400, revenue: 305600000, users: 6234, growth: 8.2 },
    { month: "T2", orders: 14560, revenue: 358720000, users: 7123, growth: 12.5 },
    { month: "T3", orders: 17890, revenue: 441290000, users: 8456, growth: 18.7 },
    { month: "T4", orders: 21340, revenue: 526284000, users: 9234, growth: 15.3 },
    { month: "T5", orders: 25670, revenue: 632892000, users: 10567, growth: 22.1 },
    { month: "T6", orders: 28910, revenue: 712829000, users: 11234, growth: 18.9 },
    { month: "T7", orders: 34560, revenue: 851672000, users: 12456, growth: 25.4 },
  ]

  const hourlyData = [
    { hour: "06", orders: 23, percentage: 1.2 },
    { hour: "07", orders: 45, percentage: 2.3 },
    { hour: "08", orders: 67, percentage: 3.4 },
    { hour: "09", orders: 89, percentage: 4.5 },
    { hour: "10", orders: 123, percentage: 6.2 },
    { hour: "11", orders: 234, percentage: 11.8 },
    { hour: "12", orders: 456, percentage: 23.1 },
    { hour: "13", orders: 234, percentage: 11.8 },
    { hour: "14", orders: 123, percentage: 6.2 },
    { hour: "15", orders: 89, percentage: 4.5 },
    { hour: "16", orders: 67, percentage: 3.4 },
    { hour: "17", orders: 123, percentage: 6.2 },
    { hour: "18", orders: 345, percentage: 17.4 },
    { hour: "19", orders: 567, percentage: 28.7 },
    { hour: "20", orders: 456, percentage: 23.1 },
    { hour: "21", orders: 234, percentage: 11.8 },
    { hour: "22", orders: 123, percentage: 6.2 },
    { hour: "23", orders: 45, percentage: 2.3 },
  ]

  const categoryData = [
    { name: "Cơm", value: 35, orders: 1234, color: "#FF6F61" },
    { name: "Đồ uống", value: 28, orders: 987, color: "#4ECDC4" },
    { name: "Bánh mì", value: 18, orders: 634, color: "#45B7D1" },
    { name: "Phở", value: 12, orders: 423, color: "#96CEB4" },
    { name: "Khác", value: 7, orders: 246, color: "#FFEAA7" },
  ]

  const zonePerformance = [
    { zone: "Tòa A1-A2", orders: 892, revenue: 21808000, growth: 15.2, satisfaction: 4.7 },
    { zone: "Tòa B1-B2", orders: 756, revenue: 18522000, growth: 12.8, satisfaction: 4.8 },
    { zone: "Tòa C1-C2", orders: 834, revenue: 20434000, growth: 8.5, satisfaction: 4.6 },
    { zone: "Tòa D1-D2", orders: 974, revenue: 23908000, growth: 18.7, satisfaction: 4.9 },
  ]

  const currentData = timeRange === "7days" ? weeklyData : monthlyData

  const totalStats = {
    totalOrders: currentData.reduce((sum, item) => sum + item.orders, 0),
    totalRevenue: currentData.reduce((sum, item) => sum + item.revenue, 0),
    totalUsers: currentData[currentData.length - 1]?.users || 0,
    avgOrderValue:
      currentData.reduce((sum, item) => sum + item.revenue, 0) /
      currentData.reduce((sum, item) => sum + item.orders, 0),
    growth: timeRange === "7days" ? 12.5 : 18.7,
  }

  const COLORS = ["#FF6F61", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"]

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Báo cáo & Phân tích</h1>
          <p className="text-sm text-gray-500">Thống kê chi tiết và insights về hoạt động KTX Food</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 ngày qua</SelectItem>
              <SelectItem value="30days">30 ngày qua</SelectItem>
              <SelectItem value="3months">3 tháng qua</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.totalOrders.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">+{totalStats.growth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs kỳ trước</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Doanh thu</p>
                <p className="text-3xl font-bold text-gray-900">{(totalStats.totalRevenue / 1000000).toFixed(1)}M</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">+{totalStats.growth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs kỳ trước</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Người dùng hoạt động</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">+15.3%</span>
                  <span className="text-sm text-gray-500 ml-1">vs kỳ trước</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#FF6F61]/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-[#FF6F61]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Giá trị đơn TB</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.avgOrderValue.toLocaleString()}đ</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">-2.1%</span>
                  <span className="text-sm text-gray-500 ml-1">chi phí thấp hơn</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Xu hướng theo thời gian</CardTitle>
                <CardDescription>
                  {timeRange === "7days" ? "7 ngày qua" : timeRange === "30days" ? "30 ngày qua" : "3 tháng qua"}
                </CardDescription>
              </div>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orders">Đơn hàng</SelectItem>
                  <SelectItem value="revenue">Doanh thu</SelectItem>
                  <SelectItem value="users">Người dùng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6F61" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#FF6F61" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey={timeRange === "7days" ? "date" : "month"}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value, name) => [
                      metric === "revenue" ? `${((value as number) / 1000000).toFixed(1)}M đ` : value.toLocaleString(),
                      metric === "orders" ? "Đơn hàng" : metric === "revenue" ? "Doanh thu" : "Người dùng",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey={metric}
                    stroke="#FF6F61"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMetric)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo giờ</CardTitle>
            <CardDescription>Đơn hàng trong ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => [`${value} đơn`, "Số đơn hàng"]}
                    labelFormatter={(label) => `${label}:00`}
                  />
                  <Bar dataKey="orders" fill="#FF6F61" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo loại món</CardTitle>
            <CardDescription>Tỷ lệ đơn hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value, name, props) => [`${props.payload.orders} đơn (${value}%)`, "Số lượng"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.orders}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zone Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất theo khu vực</CardTitle>
            <CardDescription>So sánh các tòa nhà</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {zonePerformance.map((zone, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{zone.zone}</p>
                    <p className="text-xs text-gray-500">
                      {zone.orders} đơn • {zone.satisfaction}★
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{(zone.revenue / 1000000).toFixed(1)}M</p>
                    <div className="flex items-center">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-500">+{zone.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
