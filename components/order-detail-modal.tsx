"use client"

import { useState } from "react"
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Star,
  Package,
  CreditCard,
  User,
  Building2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface OrderDetailModalProps {
  order: any
  isOpen: boolean
  onClose: () => void
  onUpdateStatus: (orderId: string, status: string, note?: string) => void
}

export function OrderDetailModal({ order, isOpen, onClose, onUpdateStatus }: OrderDetailModalProps) {
  const [newStatus, setNewStatus] = useState(order?.status || "")
  const [adminNote, setAdminNote] = useState("")

  if (!order) return null

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
      preparing: { label: "Đang chuẩn bị", color: "bg-orange-100 text-orange-800", icon: Package },
      delivering: { label: "Đang giao", color: "bg-purple-100 text-purple-800", icon: MapPin },
      completed: { label: "Hoàn thành", color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-800", icon: XCircle },
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

  const getTimelineStatus = (currentStatus: string, targetStatus: string) => {
    const statusOrder = ["pending", "confirmed", "preparing", "delivering", "completed"]
    const currentIndex = statusOrder.indexOf(currentStatus)
    const targetIndex = statusOrder.indexOf(targetStatus)

    if (currentStatus === "cancelled") return "cancelled"
    if (currentIndex >= targetIndex) return "completed"
    return "pending"
  }

  const handleUpdateStatus = () => {
    onUpdateStatus(order.id, newStatus, adminNote)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Chi tiết đơn hàng #{order.id}
            {getStatusBadge(order.status)}
          </DialogTitle>
          <DialogDescription>Đặt lúc {new Date(order.timing.ordered).toLocaleString("vi-VN")}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Thông tin khách hàng
              </h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61]">{order.customer.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">MSSV: {order.customer.studentId}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{order.customer.phone}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Nhắn tin
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Thông tin quán ăn
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF6F61]/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-[#FF6F61]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{order.restaurant.name}</p>
                  <p className="text-sm text-gray-500">{order.restaurant.type}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{order.restaurant.phone}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Gọi quán
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Món đã đặt
              </h3>
              <div className="space-y-3">
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded p-3">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toLocaleString()}đ</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Thông tin giao hàng
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{order.delivery.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span>Khu vực: {order.delivery.zone}</span>
                </div>
                {order.delivery.instructions && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mt-2">
                    <p className="text-sm">
                      <strong>Ghi chú:</strong> {order.delivery.instructions}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Thanh toán
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{order.payment.subtotal.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí ship:</span>
                  <span className={order.payment.shippingFee === 0 ? "text-green-600" : ""}>
                    {order.payment.shippingFee === 0 ? "Miễn phí" : `${order.payment.shippingFee.toLocaleString()}đ`}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span>Tổng cộng:</span>
                  <span>{order.payment.total.toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Hoa hồng (10%):</span>
                  <span className="text-[#FF6F61]">{order.payment.commission.toLocaleString()}đ</span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline">{order.payment.method}</Badge>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Tiến trình đơn hàng
              </h3>
              <div className="space-y-3">
                {[
                  { status: "pending", label: "Chờ xác nhận", time: order.timing.ordered },
                  { status: "confirmed", label: "Đã xác nhận", time: order.timing.confirmed },
                  { status: "preparing", label: "Đang chuẩn bị", time: order.timing.preparing },
                  { status: "delivering", label: "Đang giao", time: order.timing.delivering },
                  { status: "completed", label: "Hoàn thành", time: order.timing.completed },
                ].map((step, index) => {
                  const stepStatus = getTimelineStatus(order.status, step.status)
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          stepStatus === "completed"
                            ? "bg-green-500"
                            : stepStatus === "cancelled"
                              ? "bg-red-500"
                              : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${stepStatus === "completed" ? "font-medium" : "text-gray-500"}`}>
                          {step.label}
                        </p>
                        {step.time && (
                          <p className="text-xs text-gray-400">{new Date(step.time).toLocaleString("vi-VN")}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Update Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Cập nhật trạng thái</h3>
              <div className="space-y-3">
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái mới" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ xác nhận</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
                    <SelectItem value="delivering">Đang giao</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Hủy đơn</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Ghi chú admin (tùy chọn)"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                />
                <Button
                  onClick={handleUpdateStatus}
                  className="w-full bg-[#FF6F61] hover:bg-[#E55A4E] text-white"
                  disabled={!newStatus || newStatus === order.status}
                >
                  Cập nhật trạng thái
                </Button>
              </div>
            </div>

            {/* Rating & Review */}
            {order.rating && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Đánh giá
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < order.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="font-medium">{order.rating}/5</span>
                </div>
                {order.notes && <p className="text-sm text-gray-600 bg-white rounded p-2">"{order.notes}"</p>}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
