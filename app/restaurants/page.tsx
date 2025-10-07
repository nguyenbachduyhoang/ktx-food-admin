"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Eye,
  Phone,
  MessageCircle,
  Star,
  MapPin,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Download,
  Edit,
  Trash2,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RestaurantFormModal } from "@/components/restaurant-form-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"

export default function RestaurantsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [restaurants, setRestaurants] = useState([
    {
      id: "R001",
      name: "Cơm Tấm Cô Ba",
      category: "Cơm",
      owner: "Nguyễn Thị Ba",
      phone: "0987654321",
      location: "Gần cổng chính KTX",
      rating: 4.8,
      totalReviews: 234,
      status: "active",
      revenue: 5850000,
      orders: 234,
      avgDeliveryTime: "11 phút",
      commission: 585000,
      joinDate: "2023-08-15",
      specialties: ["Cơm tấm sườn nướng", "Cơm tấm bì chả", "Chè ba màu"],
      operatingHours: "10:00 - 22:00",
      growth: 18,
    },
    {
      id: "R002",
      name: "Bánh Mì Chảo 3K",
      category: "Bánh mì",
      owner: "Trần Văn Minh",
      phone: "0987654322",
      location: "Khu ăn uống tập trung",
      rating: 4.6,
      totalReviews: 189,
      status: "active",
      revenue: 2835000,
      orders: 189,
      avgDeliveryTime: "8 phút",
      commission: 283500,
      joinDate: "2023-09-01",
      specialties: ["Bánh mì chảo tôm", "Bánh mì chảo bò", "Bánh mì pate"],
      operatingHours: "06:00 - 23:00",
      growth: 12,
    },
    {
      id: "R003",
      name: "Trà Sữa Gong Cha Mini",
      category: "Đồ uống",
      owner: "Lê Thị Hoa",
      phone: "0987654323",
      location: "Tầng trệt tòa A1",
      rating: 4.9,
      totalReviews: 156,
      status: "active",
      revenue: 3432000,
      orders: 156,
      avgDeliveryTime: "6 phút",
      commission: 343200,
      joinDate: "2023-07-20",
      specialties: ["Trà sữa trân châu", "Trà đào", "Sinh tố bơ"],
      operatingHours: "08:00 - 23:30",
      growth: 25,
    },
    {
      id: "R004",
      name: "Phở Hà Nội Mini",
      category: "Phở",
      owner: "Phạm Văn Đức",
      phone: "0987654324",
      location: "Gần sân bóng",
      rating: 4.7,
      totalReviews: 143,
      status: "active",
      revenue: 5005000,
      orders: 143,
      avgDeliveryTime: "14 phút",
      commission: 500500,
      joinDate: "2023-06-10",
      specialties: ["Phở bò tái", "Phở gà", "Bún bò Huế"],
      operatingHours: "06:30 - 22:00",
      growth: 15,
    },
    {
      id: "R005",
      name: "Lẩu Thái Tomyum",
      category: "Lẩu",
      owner: "Nguyễn Thị Lan",
      phone: "0987654325",
      location: "Khu vực tòa C",
      rating: 4.5,
      totalReviews: 89,
      status: "pending",
      revenue: 2100000,
      orders: 89,
      avgDeliveryTime: "18 phút",
      commission: 210000,
      joinDate: "2024-01-05",
      specialties: ["Lẩu Thái", "Lẩu hải sản", "Mì Tomyum"],
      operatingHours: "16:00 - 23:00",
      growth: -5,
    },
    {
      id: "R006",
      name: "Chè Cung Đình",
      category: "Chè",
      owner: "Võ Thị Mai",
      phone: "0987654326",
      location: "Tầng trệt tòa B2",
      rating: 4.4,
      totalReviews: 67,
      status: "inactive",
      revenue: 890000,
      orders: 67,
      avgDeliveryTime: "10 phút",
      commission: 89000,
      joinDate: "2023-11-15",
      specialties: ["Chè ba màu", "Chè đậu đỏ", "Chè bưởi"],
      operatingHours: "14:00 - 22:00",
      growth: -12,
    },
  ])

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Hoạt động", variant: "default" as const, color: "bg-green-100 text-green-800" },
      pending: { label: "Chờ duyệt", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      inactive: { label: "Tạm ngưng", variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active

    return <Badge className={config.color}>{config.label}</Badge>
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory = selectedCategory === "all" || restaurant.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || restaurant.status === selectedStatus
    const matchesSearch =
      searchQuery === "" ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.owner.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesStatus && matchesSearch
  })

  const stats = {
    total: restaurants.length,
    active: restaurants.filter((r) => r.status === "active").length,
    pending: restaurants.filter((r) => r.status === "pending").length,
    inactive: restaurants.filter((r) => r.status === "inactive").length,
    totalRevenue: restaurants.reduce((sum, r) => sum + r.revenue, 0),
    totalOrders: restaurants.reduce((sum, r) => sum + r.orders, 0),
  }

  const handleCreateRestaurant = () => {
    setSelectedRestaurant(null)
    setFormMode("create")
    setIsFormModalOpen(true)
  }

  const handleEditRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setFormMode("edit")
    setIsFormModalOpen(true)
  }

  const handleDeleteRestaurant = (restaurant: any) => {
    setSelectedRestaurant(restaurant)
    setIsDeleteModalOpen(true)
  }

  const handleSaveRestaurant = (data: any) => {
    if (formMode === "create") {
      setRestaurants([...restaurants, data])
    } else {
      setRestaurants(restaurants.map((r) => (r.id === data.id ? data : r)))
    }
  }

  const handleConfirmDelete = () => {
    if (selectedRestaurant) {
      setRestaurants(restaurants.filter((r) => r.id !== selectedRestaurant.id))
    }
    setIsDeleteModalOpen(false)
    setSelectedRestaurant(null)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quản lý quán ăn</h1>
          <p className="text-sm text-gray-500">Danh sách các quán ăn nội khu KTX</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất Excel
          </Button>
          <Button size="sm" className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white" onClick={handleCreateRestaurant}>
            <Plus className="h-4 w-4 mr-2" />
            Thêm quán ăn
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Tổng quán</p>
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
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-500">Chờ duyệt</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
              <p className="text-sm text-gray-500">Tạm ngưng</p>
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
                  placeholder="Tìm kiếm theo tên quán, chủ quán..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Loại món" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại món</SelectItem>
                <SelectItem value="Cơm">Cơm</SelectItem>
                <SelectItem value="Bánh mì">Bánh mì</SelectItem>
                <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                <SelectItem value="Phở">Phở</SelectItem>
                <SelectItem value="Lẩu">Lẩu</SelectItem>
                <SelectItem value="Chè">Chè</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="inactive">Tạm ngưng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Restaurants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách quán ăn</CardTitle>
          <CardDescription>
            Hiển thị {filteredRestaurants.length} / {restaurants.length} quán ăn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quán ăn</TableHead>
                <TableHead>Chủ quán</TableHead>
                <TableHead>Loại món</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Doanh thu</TableHead>
                <TableHead>Hoa hồng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRestaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61]">
                          {restaurant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{restaurant.name}</p>
                        <p className="text-xs text-gray-500">{restaurant.orders} đơn hàng</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{restaurant.owner}</p>
                      <p className="text-xs text-gray-500">{restaurant.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{restaurant.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{restaurant.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span className="text-xs text-gray-500">({restaurant.totalReviews})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{restaurant.revenue.toLocaleString()}đ</p>
                      <div className="flex items-center gap-1">
                        {restaurant.growth > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-xs ${restaurant.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                          {restaurant.growth > 0 ? "+" : ""}
                          {restaurant.growth}%
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-[#FF6F61]">{restaurant.commission.toLocaleString()}đ</p>
                    <p className="text-xs text-gray-500">10%</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(restaurant.status)}</TableCell>
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
                          <Phone className="h-4 w-4 mr-2" />
                          Gọi điện
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Nhắn tin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditRestaurant(restaurant)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteRestaurant(restaurant)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
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
      <RestaurantFormModal
        restaurant={selectedRestaurant}
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveRestaurant}
        mode={formMode}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Xóa quán ăn"
        description="Bạn có chắc chắn muốn xóa quán ăn này?"
        itemName={selectedRestaurant?.name || ""}
      />
    </div>
  )
}
