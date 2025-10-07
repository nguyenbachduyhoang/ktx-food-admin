"use client"

import { useState } from "react"
import {
  User,
  Building2,
  Star,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Clock,
  Package,
  ImageIcon,
  MessageCircle,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ReviewDetailModalProps {
  review: any
  isOpen: boolean
  onClose: () => void
}

export function ReviewDetailModal({ review, isOpen, onClose }: ReviewDetailModalProps) {
  const [moderationNote, setModerationNote] = useState("")

  if (!review) return null

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="ml-2 text-lg font-semibold">{rating}/5</span>
      </div>
    )
  }

  const handleModerateReview = (action: string) => {
    console.log(`Moderating review ${review.id} with action: ${action}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Star className="h-5 w-5 text-yellow-500" />
            Chi tiết đánh giá #{review.id}
            {review.reported && <Badge className="bg-red-100 text-red-800">Bị báo cáo</Badge>}
          </DialogTitle>
          <DialogDescription>Đánh giá lúc {new Date(review.createdAt).toLocaleString("vi-VN")}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Thông tin sinh viên
              </h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61]">{review.student.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{review.student.name}</p>
                  <p className="text-sm text-gray-500">MSSV: {review.student.studentId}</p>
                </div>
              </div>
            </div>

            {/* Restaurant & Order Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Thông tin quán ăn & đơn hàng
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF6F61]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#FF6F61]" />
                  </div>
                  <div>
                    <p className="font-medium">{review.restaurant.name}</p>
                    <p className="text-sm text-gray-500">ID: {review.restaurant.id}</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Đơn hàng: #{review.orderId}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Nội dung đánh giá</h3>
              <div className="space-y-4">
                {/* Rating */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Điểm đánh giá</p>
                  {renderStars(review.rating)}
                </div>

                {/* Review Text */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Nhận xét</p>
                  <div className="bg-white rounded p-3">
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                </div>

                {/* Images */}
                {review.images && review.images.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">Hình ảnh đính kèm ({review.images.length})</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {review.images.map((image: string, index: number) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-200 rounded border flex items-center justify-center"
                        >
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Helpful Count */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">{review.helpful} người thấy hữu ích</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Response */}
            {review.restaurantResponse ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Phản hồi từ quán ăn
                </h3>
                <div className="bg-white rounded p-3">
                  <p className="text-gray-700">{review.restaurantResponse.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(review.restaurantResponse.respondedAt).toLocaleString("vi-VN")}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <MessageCircle className="h-4 w-4 inline mr-2" />
                  Quán ăn chưa phản hồi đánh giá này
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Review Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Thống kê đánh giá</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Điểm đánh giá</span>
                  <span className="font-semibold">{review.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hữu ích</span>
                  <span className="font-semibold">{review.helpful} lượt</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Có hình ảnh</span>
                  <span className="font-semibold">{review.images.length > 0 ? "Có" : "Không"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phản hồi quán</span>
                  <span className="font-semibold">{review.restaurantResponse ? "Có" : "Không"}</span>
                </div>
              </div>
            </div>

            {/* Moderation Actions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Kiểm duyệt
              </h3>
              <div className="space-y-3">
                {review.reported && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-800">Đánh giá bị báo cáo</span>
                    </div>
                    <p className="text-sm text-red-700">
                      Đánh giá này đã bị báo cáo vi phạm. Vui lòng xem xét và thực hiện hành động phù hợp.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => handleModerateReview("approve")}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Phê duyệt
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    onClick={() => handleModerateReview("hide")}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Ẩn đánh giá
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    onClick={() => handleModerateReview("delete")}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Xóa đánh giá
                  </Button>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Ghi chú kiểm duyệt</p>
                  <Textarea
                    placeholder="Nhập ghi chú về quyết định kiểm duyệt..."
                    value={moderationNote}
                    onChange={(e) => setModerationNote(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Thời gian</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-600">Đánh giá:</span>
                  <span>{new Date(review.createdAt).toLocaleString("vi-VN")}</span>
                </div>
                {review.restaurantResponse && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Phản hồi:</span>
                    <span>{new Date(review.restaurantResponse.respondedAt).toLocaleString("vi-VN")}</span>
                  </div>
                )}
              </div>
            </div>
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
