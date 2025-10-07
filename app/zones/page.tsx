"use client"

import { Building2, Users, ShoppingCart, MapPin, TrendingUp, Clock, Star } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function ZonesPage() {
  const zones = [
    {
      id: "A1-A2",
      name: "Tòa A1-A2",
      buildings: ["Tòa A1", "Tòa A2"],
      totalRooms: 400,
      occupiedRooms: 380,
      totalStudents: 8500,
      activeUsers: 892,
      penetrationRate: 10.5,
      totalOrders: 2847,
      revenue: 69580000,
      avgDeliveryTime: "11 phút",
      topRestaurants: ["Cơm Tấm Cô Ba", "Bánh Mì Chảo 3K"],
      peakHours: "18:00-20:00",
      satisfaction: 4.7,
      growth: 15.2,
    },
    {
      id: "B1-B2",
      name: "Tòa B1-B2",
      buildings: ["Tòa B1", "Tòa B2"],
      totalRooms: 360,
      occupiedRooms: 340,
      totalStudents: 7200,
      activeUsers: 756,
      penetrationRate: 10.5,
      totalOrders: 2234,
      revenue: 54820000,
      avgDeliveryTime: "9 phút",
      topRestaurants: ["Trà Sữa Gong Cha Mini", "Phở Hà Nội Mini"],
      peakHours: "19:00-21:00",
      satisfaction: 4.8,
      growth: 12.8,
    },
    {
      id: "C1-C2",
      name: "Tòa C1-C2",
      buildings: ["Tòa C1", "Tòa C2"],
      totalRooms: 455,
      occupiedRooms: 420,
      totalStudents: 9100,
      activeUsers: 834,
      penetrationRate: 9.2,
      totalOrders: 2567,
      revenue: 62890000,
      avgDeliveryTime: "13 phút",
      topRestaurants: ["Cơm Tấm Cô Ba", "Trà Sữa Gong Cha Mini"],
      peakHours: "17:30-19:30",
      satisfaction: 4.6,
      growth: 8.5,
    },
    {
      id: "D1-D2",
      name: "Tòa D1-D2",
      buildings: ["Tòa D1", "Tòa D2"],
      totalRooms: 440,
      occupiedRooms: 410,
      totalStudents: 8800,
      activeUsers: 974,
      penetrationRate: 11.1,
      totalOrders: 3156,
      revenue: 77340000,
      avgDeliveryTime: "10 phút",
      topRestaurants: ["Phở Hà Nội Mini", "Bánh Mì Chảo 3K"],
      peakHours: "18:30-20:30",
      satisfaction: 4.9,
      growth: 18.7,
    },
  ]

  const ordersByZone = zones.map((zone) => ({
    zone: zone.name,
    orders: zone.totalOrders,
    revenue: zone.revenue,
    users: zone.activeUsers,
  }))

  const penetrationData = zones.map((zone) => ({
    name: zone.name,
    value: zone.penetrationRate,
    users: zone.activeUsers,
    total: zone.totalStudents,
  }))

  const COLORS = ["#FF6F61", "#4ECDC4", "#45B7D1", "#96CEB4"]

  const totalStats = {
    totalStudents: zones.reduce((sum, zone) => sum + zone.totalStudents, 0),
    activeUsers: zones.reduce((sum, zone) => sum + zone.activeUsers, 0),
    totalOrders: zones.reduce((sum, zone) => sum + zone.totalOrders, 0),
    totalRevenue: zones.reduce((sum, zone) => sum + zone.revenue, 0),
    avgPenetration: zones.reduce((sum, zone) => sum + zone.penetrationRate, 0) / zones.length,
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý khu vực KTX</h1>
          <p className="text-sm text-gray-500">Thống kê và phân tích theo từng tòa nhà KTX khu B</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng sinh viên</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.totalStudents.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">4 tòa nhà</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Người dùng hoạt động</p>
                <p className="text-3xl font-bold text-[#FF6F61]">{totalStats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-green-500 mt-1">+{totalStats.avgPenetration.toFixed(1)}% thâm nhập</p>
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
                <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                <p className="text-3xl font-bold text-gray-900">{totalStats.totalOrders.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Tháng này</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-green-600" />
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
                <p className="text-sm text-gray-500 mt-1">Triệu đồng</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {zones.map((zone) => (
          <Card key={zone.id} className="bg-white border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF6F61]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-[#FF6F61]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                    <CardDescription>{zone.buildings.join(" • ")}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-[#FF6F61] border-[#FF6F61]">
                  {zone.penetrationRate}% thâm nhập
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{zone.activeUsers}</p>
                  <p className="text-xs text-gray-500">Người dùng</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{zone.totalOrders}</p>
                  <p className="text-xs text-gray-500">Đơn hàng</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">{(zone.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-500">Doanh thu</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Thời gian giao TB</span>
                  </div>
                  <span className="text-sm font-medium">{zone.avgDeliveryTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Đánh giá TB</span>
                  </div>
                  <span className="text-sm font-medium">{zone.satisfaction}★</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Tăng trưởng</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">+{zone.growth}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Giờ cao điểm</span>
                  </div>
                  <span className="text-sm font-medium">{zone.peakHours}</span>
                </div>
              </div>

              {/* Top Restaurants */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Quán ăn phổ biến:</p>
                <div className="flex flex-wrap gap-2">
                  {zone.topRestaurants.map((restaurant, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {restaurant}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by Zone */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng theo khu vực</CardTitle>
            <CardDescription>So sánh số lượng đơn hàng giữa các tòa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ordersByZone}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => [`${value} đơn`, "Số đơn hàng"]}
                  />
                  <Bar dataKey="orders" fill="#FF6F61" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Penetration Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Tỷ lệ thâm nhập</CardTitle>
            <CardDescription>Phần trăm sinh viên sử dụng dịch vụ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={penetrationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {penetrationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value, name, props) => [
                      `${props.payload.users} / ${props.payload.total} sinh viên (${value}%)`,
                      "Tỷ lệ sử dụng",
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
