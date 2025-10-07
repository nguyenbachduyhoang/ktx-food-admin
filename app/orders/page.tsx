"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Eye,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Building2,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react"

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
import { OrderDetailModal } from "@/components/order-detail-modal"

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedZone, setSelectedZone] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [orders, setOrders] = useState([
    {
      id: "KTX001",
      customer: {
        name: "Nguyễn Văn A",
        phone: "0901234567",
        avatar: "NA",
        studentId: "20120001",
      },
      restaurant: {
        name: "Cơm Tấm Cô Ba",
        phone: "0987654321",
        type: "Cơm",
      },
      items: [
        { name: "Cơm tấm sườn nướng", quantity: 1, price: 25000 },
        { name: "Trà đá", quantity: 1, price: 3000 },
      ],
      delivery: {
        address: "Tòa A1 - Phòng 205",
        zone: "Tòa A1-A2",
        instructions: "Gọi trước khi lên",
      },
      payment: {
        subtotal: 28000,
        shippingFee: 0,
        total: 28000,
        commission: 2800,
        method: "Tiền mặt",
      },
      status: "completed",
      timing: {
        ordered: "2024-01-15 18:30:00",
        confirmed: "2024-01-15 18:31:00",
        preparing: "2024-01-15 18:32:00",
        delivering: "2024-01-15 18:40:00",
        completed: "2024-01-15 18:45:00",
        estimatedDelivery: "15 phút",
        actualDelivery: "15 phút",
      },
      rating: 5,
      notes: "Giao nhanh, món ngon!",
    },
    {
      id: "KTX002",
      customer: {
        name: "Trần Thị B",
        phone: "0901234568",
        avatar: "TB",
        studentId: "20120002",
      },
      restaurant: {
        name: "Bánh Mì Chảo 3K",
        phone: "0987654322",
        type: "Bánh mì",
      },
      items: [{ name: "Bánh mì chảo tôm", quantity: 1, price: 15000 }],
      delivery: {
        address: "Tòa B2 - Phòng 314",
        zone: "Tòa B1-B2",
        instructions: "",
      },
      payment: {
        subtotal: 15000,
        shippingFee: 0,
        total: 15000,
        commission: 1500,
        method: "ZaloPay",
      },
      status: "delivering",
      timing: {
        ordered: "2024-01-15 19:15:00",
        confirmed: "2024-01-15 19:16:00",
        preparing: "2024-01-15 19:17:00",
        delivering: "2024-01-15 19:25:00",
        estimatedDelivery: "10 phút",
      },
      rating: null,
      notes: "",
    },
    {
      id: "KTX003",
      customer: {
        name: "Lê Minh C",
        phone: "0901234569",
        avatar: "LC",
        studentId: "20120003",
      },
      restaurant: {
        name: "Trà Sữa Gong Cha Mini",
        phone: "0987654323",
        type: "Đồ uống",
      },
      items: [{ name: "Trà sữa trân châu", quantity: 2, price: 22000 }],
      delivery: {
        address: "Tòa C1 - Phòng 108",
        zone: "Tòa C1-C2",
        instructions: "Để ở bàn bảo vệ",
      },
      payment: {
        subtotal: 44000,
        shippingFee: 0,
        total: 44000,
        commission: 4400,
        method: "Momo",
      },
      status: "preparing",
      timing: {
        ordered: "2024-01-15 19:30:00",
        confirmed: "2024-01-15 19:31:00",
        preparing: "2024-01-15 19:32:00",
        estimatedDelivery: "8 phút",
      },
      rating: null,
      notes: "",
    },
    {
      id: "KTX004",
      customer: {
        name: "Phạm Thị D",
        phone: "0901234570",
        avatar: "PD",
        studentId: "20120004",
      },
      restaurant: {
        name: "Phở Hà Nội Mini",
        phone: "0987654324",
        type: "Phở",
      },
      items: [{ name: "Phở bò tái", quantity: 1, price: 35000 }],
      delivery: {
        address: "Tòa D1 - Phòng 421",
        zone: "Tòa D1-D2",
        instructions: "",
      },
      payment: {
        subtotal: 35000,
        shippingFee: 5000,
        total: 40000,
        commission: 3500,
        method: "Tiền mặt",
      },
      status: "pending",
      timing: {
        ordered: "2024-01-15 19:45:00",
        estimatedDelivery: "12 phút",
      },
      rating: null,
      notes: "",
    },
    {
      id: "KTX005",
      customer: {
        name: "Hoàng Văn E",
        phone: "0901234571",
        avatar: "HE",
        studentId: "20120005",
      },
      restaurant: {
        name: "Cơm Tấm Cô Ba",
        phone: "0987654321",
        type: "Cơm",
      },
      items: [
        { name: "Cơm tấm bì chả", quantity: 1, price: 23000 },
        { name: "Chè ba màu", quantity: 1, price: 12000 },
      ],
      delivery: {
        address: "Tòa A2 - Phòng 156",
        zone: "Tòa A1-A2",
        instructions: "",
      },
      payment: {
        subtotal: 35000,
        shippingFee: 0,
        total: 35000,
        commission: 3500,
        method: "VNPay",
      },
      status: "cancelled",
      timing: {
        ordered: "2024-01-15 18:00:00",
        cancelled: "2024-01-15 18:05:00",
        cancelReason: "Khách hàng hủy - thay đổi ý định",
      },
      rating: null,
      notes: "",
    },
  ])

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  const handleUpdateOrderStatus = (orderId: string, status: string, note?: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              timing: {
                ...order.timing,
                [status]: new Date().toISOString(),
              },
            }
          : order,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Chờ xác nhận", variant: "outline" as const, color: "text-yellow-600" },
      confirmed: { label: "Đã xác nhận", variant: "secondary" as const, color: "text-blue-600" },
      preparing: { label: "Đang chuẩn bị", variant: "secondary" as const, color: "text-orange-600" },
      delivering: { label: "Đang giao", variant: "default" as const, color: "text-purple-600" },
      completed: { label: "Hoàn thành", variant: "default" as const, color: "text-green-600" },
      cancelled: { label: "Đã hủy", variant: "destructive" as const, color: "text-red-600" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

    return (
      <Badge variant={config.variant} className={`${config.color}`}>
        {config.label}
      </Badge>
    )
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

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesZone = selectedZone === "all" || order.delivery.zone === selectedZone
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesZone && matchesSearch
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    delivering: orders.filter((o) => o.status === "delivering").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý đơn hàng</h1>
          <p className="text-sm text-gray-500">Theo dõi và quản lý tất cả đơn hàng trong KTX</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
              <p className="text-sm text-gray-500">Tổng đơn</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
              <p className="text-sm text-gray-500">Chờ xác nhận</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{orderStats.preparing}</p>
              <p className="text-sm text-gray-500">Đang chuẩn bị</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{orderStats.delivering}</p>
              <p className="text-sm text-gray-500">Đang giao</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{orderStats.completed}</p>
              <p className="text-sm text-gray-500">Hoàn thành</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
              <p className="text-sm text-gray-500">Đã hủy</p>
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
                  placeholder="Tìm kiếm theo mã đơn, tên khách hàng, quán ăn..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
                <SelectItem value="delivering">Đang giao</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>
            Hiển thị {filteredOrders.length} / {orders.length} đơn hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Quán ăn</TableHead>
                <TableHead>Địa chỉ giao</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Hoa hồng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61] text-xs">
                          {order.customer.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{order.customer.name}</p>
                        <p className="text-xs text-gray-500">{order.customer.studentId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{order.restaurant.name}</p>
                      <p className="text-xs text-gray-500">{order.restaurant.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{order.delivery.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.payment.total.toLocaleString()}đ</p>
                      {order.payment.shippingFee > 0 && (
                        <p className="text-xs text-gray-500">+ {order.payment.shippingFee.toLocaleString()}đ ship</p>
                      )}
                      {order.payment.shippingFee === 0 && <p className="text-xs text-green-600">Miễn phí ship</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-[#FF6F61]">{order.payment.commission.toLocaleString()}đ</p>
                    <p className="text-xs text-gray-500">10%</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{getTimeAgo(order.timing.ordered)}</p>
                      {order.timing.estimatedDelivery && (
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{order.timing.estimatedDelivery}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="h-4 w-4 mr-2" />
                          Gọi khách hàng
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Nhắn tin khách hàng
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Building2 className="h-4 w-4 mr-2" />
                          Liên hệ quán ăn
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
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  )
}
