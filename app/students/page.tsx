"use client"

import { useState } from "react"
import { Search, Eye, MessageCircle, MapPin, ShoppingCart, MoreHorizontal, Download } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StudentsPage() {
  const [selectedZone, setSelectedZone] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const students = [
    {
      id: "20120001",
      name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@student.hcmus.edu.vn",
      room: "A1-205",
      zone: "Tòa A1-A2",
      faculty: "Công nghệ Thông tin",
      year: "Năm 3",
      status: "active",
      totalOrders: 45,
      totalSpent: 1250000,
      avgOrderValue: 27778,
      lastOrder: "2024-01-15 19:30:00",
      joinDate: "2023-08-15",
      favoriteRestaurant: "Cơm Tấm Cô Ba",
      avatar: "NA",
    },
    {
      id: "20120002",
      name: "Trần Thị B",
      phone: "0901234568",
      email: "tranthib@student.hcmus.edu.vn",
      room: "B2-314",
      zone: "Tòa B1-B2",
      faculty: "Kinh tế",
      year: "Năm 2",
      status: "active",
      totalOrders: 32,
      totalSpent: 890000,
      avgOrderValue: 27813,
      lastOrder: "2024-01-15 18:45:00",
      joinDate: "2023-09-01",
      favoriteRestaurant: "Bánh Mì Chảo 3K",
      avatar: "TB",
    },
    {
      id: "20120003",
      name: "Lê Minh C",
      phone: "0901234569",
      email: "leminhc@student.hcmus.edu.vn",
      room: "C1-108",
      zone: "Tòa C1-C2",
      faculty: "Toán - Tin học",
      year: "Năm 4",
      status: "active",
      totalOrders: 67,
      totalSpent: 1890000,
      avgOrderValue: 28209,
      lastOrder: "2024-01-15 20:15:00",
      joinDate: "2023-07-20",
      favoriteRestaurant: "Trà Sữa Gong Cha Mini",
      avatar: "LC",
    },
    {
      id: "20120004",
      name: "Phạm Thị D",
      phone: "0901234570",
      email: "phamthid@student.hcmus.edu.vn",
      room: "D1-421",
      zone: "Tòa D1-D2",
      faculty: "Hóa học",
      year: "Năm 1",
      status: "active",
      totalOrders: 23,
      totalSpent: 645000,
      avgOrderValue: 28043,
      lastOrder: "2024-01-15 17:20:00",
      joinDate: "2023-12-01",
      favoriteRestaurant: "Phở Hà Nội Mini",
      avatar: "PD",
    },
    {
      id: "20120005",
      name: "Hoàng Văn E",
      phone: "0901234571",
      email: "hoangvane@student.hcmus.edu.vn",
      room: "A2-156",
      zone: "Tòa A1-A2",
      faculty: "Vật lý",
      year: "Năm 2",
      status: "inactive",
      totalOrders: 12,
      totalSpent: 340000,
      avgOrderValue: 28333,
      lastOrder: "2023-12-20 19:00:00",
      joinDate: "2023-10-15",
      favoriteRestaurant: "Cơm Tấm Cô Ba",
      avatar: "HE",
    },
    {
      id: "20120006",
      name: "Võ Thị F",
      phone: "0901234572",
      email: "vothif@student.hcmus.edu.vn",
      room: "B1-289",
      zone: "Tòa B1-B2",
      faculty: "Sinh học",
      year: "Năm 3",
      status: "new",
      totalOrders: 3,
      totalSpent: 85000,
      avgOrderValue: 28333,
      lastOrder: "2024-01-14 12:30:00",
      joinDate: "2024-01-10",
      favoriteRestaurant: "Trà Sữa Gong Cha Mini",
      avatar: "VF",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Hoạt động", color: "bg-green-100 text-green-800" },
      inactive: { label: "Không hoạt động", color: "bg-red-100 text-red-800" },
      new: { label: "Mới", color: "bg-blue-100 text-blue-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active

    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const orderTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`
    }
  }

  const filteredStudents = students.filter((student) => {
    const matchesZone = selectedZone === "all" || student.zone === selectedZone
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus
    const matchesSearch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery) ||
      student.room.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesZone && matchesStatus && matchesSearch
  })

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    inactive: students.filter((s) => s.status === "inactive").length,
    new: students.filter((s) => s.status === "new").length,
    totalOrders: students.reduce((sum, s) => sum + s.totalOrders, 0),
    totalRevenue: students.reduce((sum, s) => sum + s.totalSpent, 0),
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý sinh viên</h1>
          <p className="text-sm text-gray-500">Danh sách sinh viên sử dụng dịch vụ KTX Food</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng sinh viên</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              <p className="text-sm text-gray-500">Hoạt động</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              <p className="text-sm text-gray-500">Mới tham gia</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#FF6F61]">{stats.totalOrders}</p>
              <p className="text-sm text-gray-500">Tổng đơn hàng</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên, MSSV, phòng..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Khu vực" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả khu vực</SelectItem>
                <SelectItem value="Tòa A1-A2">Tòa A1-A2</SelectItem>
                <SelectItem value="Tòa B1-B2">Tòa B1-B2</SelectItem>
                <SelectItem value="Tòa C1-C2">Tòa C1-C2</SelectItem>
                <SelectItem value="Tòa D1-D2">Tòa D1-D2</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
                <SelectItem value="new">Mới tham gia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sinh viên</CardTitle>
          <CardDescription>
            Hiển thị {filteredStudents.length} / {students.length} sinh viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sinh viên</TableHead>
                <TableHead>MSSV</TableHead>
                <TableHead>Phòng</TableHead>
                <TableHead>Khoa</TableHead>
                <TableHead>Đơn hàng</TableHead>
                <TableHead>Chi tiêu</TableHead>
                <TableHead>Đơn cuối</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61] text-sm">
                          {student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.year}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{student.id}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{student.room}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{student.faculty}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.totalOrders} đơn</p>
                      <p className="text-xs text-gray-500">TB: {student.avgOrderValue.toLocaleString()}đ</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-[#FF6F61]">{student.totalSpent.toLocaleString()}đ</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{getTimeAgo(student.lastOrder)}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Lịch sử đơn hàng
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Gửi thông báo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
