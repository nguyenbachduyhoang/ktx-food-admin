"use client"

import { useState } from "react"
import { DollarSign, Building2, Calendar, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function CommissionPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [selectedRestaurant, setSelectedRestaurant] = useState("all")

  const commissionData = [
    {
      id: "C001",
      restaurant: "Cơm Tấm Cô Ba",
      owner: "Nguyễn Thị Ba",
      period: "Tháng 1/2024",
      totalRevenue: 5850000,
      commissionRate: 10,
      commissionAmount: 585000,
      totalOrders: 234,
      status: "paid",
      paidDate: "2024-02-05",
      dueDate: "2024-02-15",
    },
    {
      id: "C002",
      restaurant: "Bánh Mì Chảo 3K",
      owner: "Trần Văn Minh",
      period: "Tháng 1/2024",
      totalRevenue: 2835000,
      commissionRate: 10,
      commissionAmount: 283500,
      totalOrders: 189,
      status: "paid",
      paidDate: "2024-02-03",
      dueDate: "2024-02-15",
    },
    {
      id: "C003",
      restaurant: "Trà Sữa Gong Cha Mini",
      owner: "Lê Thị Hoa",
      period: "Tháng 1/2024",
      totalRevenue: 3432000,
      commissionRate: 10,
      commissionAmount: 343200,
      totalOrders: 156,
      status: "pending",
      paidDate: null,
      dueDate: "2024-02-15",
    },
    {
      id: "C004",
      restaurant: "Phở Hà Nội Mini",
      owner: "Phạm Văn Đức",
      period: "Tháng 1/2024",
      totalRevenue: 5005000,
      commissionRate: 10,
      commissionAmount: 500500,
      totalOrders: 143,
      status: "overdue",
      paidDate: null,
      dueDate: "2024-02-15",
    },
  ]

  const monthlyCommission = [
    { month: "T7", total: 847200, paid: 847200, pending: 0 },
    { month: "T8", total: 923400, paid: 923400, pending: 0 },
    { month: "T9", total: 1045600, paid: 1045600, pending: 0 },
    { month: "T10", total: 1234500, paid: 1234500, pending: 0 },
    { month: "T11", total: 1456700, paid: 1456700, pending: 0 },
    { month: "T12", total: 1678900, paid: 1567800, pending: 111100 },
    { month: "T1", total: 1712200, paid: 868700, pending: 843500 },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: "Đã thanh toán", color: "bg-green-100 text-green-800", icon: CheckCircle },
      pending: { label: "Chờ thanh toán", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      overdue: { label: "Quá hạn", color: "bg-red-100 text-red-800", icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const stats = {
    totalCommission: commissionData.reduce((sum, item) => sum + item.commissionAmount, 0),
    paidCommission: commissionData
      .filter((item) => item.status === "paid")
      .reduce((sum, item) => sum + item.commissionAmount, 0),
    pendingCommission: commissionData
      .filter((item) => item.status === "pending")
      .reduce((sum, item) => sum + item.commissionAmount, 0),
    overdueCommission: commissionData
      .filter((item) => item.status === "overdue")
      .reduce((sum, item) => sum + item.commissionAmount, 0),
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý hoa hồng</h1>
          <p className="text-sm text-gray-500">Theo dõi và thanh toán hoa hồng cho các quán ăn</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
          <Button size="sm" className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white">
            Thanh toán hàng loạt
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tổng hoa hồng</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCommission.toLocaleString()}đ</p>
                <p className="text-sm text-gray-500 mt-1">Tháng này</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Đã thanh toán</p>
                <p className="text-3xl font-bold text-green-600">{stats.paidCommission.toLocaleString()}đ</p>
                <p className="text-sm text-green-500 mt-1">
                  {((stats.paidCommission / stats.totalCommission) * 100).toFixed(1)}% tổng số
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Chờ thanh toán</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingCommission.toLocaleString()}đ</p>
                <p className="text-sm text-yellow-600 mt-1">1 quán ăn</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Quá hạn</p>
                <p className="text-3xl font-bold text-red-600">{stats.overdueCommission.toLocaleString()}đ</p>
                <p className="text-sm text-red-600 mt-1">1 quán ăn</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Commission Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng hoa hồng</CardTitle>
            <CardDescription>Hoa hồng theo tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyCommission}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => [`${(value as number).toLocaleString()}đ`, "Hoa hồng"]}
                  />
                  <Line type="monotone" dataKey="total" stroke="#FF6F61" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Commission by Restaurant */}
        <Card>
          <CardHeader>
            <CardTitle>Hoa hồng theo quán</CardTitle>
            <CardDescription>Top quán ăn theo hoa hồng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={commissionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis
                    type="category"
                    dataKey="restaurant"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => [`${(value as number).toLocaleString()}đ`, "Hoa hồng"]}
                  />
                  <Bar dataKey="commissionAmount" fill="#FF6F61" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Chi tiết hoa hồng</CardTitle>
              <CardDescription>Danh sách hoa hồng các quán ăn</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Tháng hiện tại</SelectItem>
                  <SelectItem value="last">Tháng trước</SelectItem>
                  <SelectItem value="quarter">Quý này</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quán ăn</TableHead>
                <TableHead>Chủ quán</TableHead>
                <TableHead>Kỳ thanh toán</TableHead>
                <TableHead>Doanh thu</TableHead>
                <TableHead>Tỷ lệ</TableHead>
                <TableHead>Hoa hồng</TableHead>
                <TableHead>Hạn thanh toán</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FF6F61]/10 rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-[#FF6F61]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.restaurant}</p>
                        <p className="text-xs text-gray-500">{item.totalOrders} đơn hàng</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{item.owner}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{item.period}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{item.totalRevenue.toLocaleString()}đ</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.commissionRate}%</Badge>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-[#FF6F61]">{item.commissionAmount.toLocaleString()}đ</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{item.dueDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status !== "paid" && (
                        <Button size="sm" className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white">
                          Thanh toán
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
