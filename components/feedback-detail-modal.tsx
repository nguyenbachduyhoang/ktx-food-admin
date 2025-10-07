"use client"

import { useState } from "react"
import {
  User,
  Building2,
  MessageCircle,
  AlertTriangle,
  ThumbsUp,
  Clock,
  Phone,
  Package,
  Send,
  ImageIcon,
  Paperclip,
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

interface FeedbackDetailModalProps {
  feedback: any
  isOpen: boolean
  onClose: () => void
}

export function FeedbackDetailModal({ feedback, isOpen, onClose }: FeedbackDetailModalProps) {
  const [responseMessage, setResponseMessage] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [newPriority, setNewPriority] = useState("")

  if (!feedback) return null

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "suggestion":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "compliment":
        return <ThumbsUp className="h-5 w-5 text-green-500" />
      default:
        return <MessageCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      complaint: { label: "Khiếu nại", color: "bg-red-100 text-red-800" },
      suggestion: { label: "Góp ý", color: "bg-blue-100 text-blue-800" },
      compliment: { label: "Khen ngợi", color: "bg-green-100 text-green-800" },
    }

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.suggestion

    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800" },
      in_review: { label: "Đang xem xét", color: "bg-blue-100 text-blue-800" },
      resolved: { label: "Đã xử lý", color: "bg-green-100 text-green-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "Cao", color: "bg-red-100 text-red-800" },
      medium: { label: "Trung bình", color: "bg-yellow-100 text-yellow-800" },
      low: { label: "Thấp", color: "bg-gray-100 text-gray-800" },
    }

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium

    return <Badge className={config.color}>{config.label}</Badge>
  }

  const handleSendResponse = () => {
    // Handle sending response
    console.log("Sending response:", responseMessage)
    onClose()
  }

  const isStudentFeedback = feedback.student

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getTypeIcon(feedback.type)}
            Chi tiết phản hồi #{feedback.id}
            {getTypeBadge(feedback.type)}
          </DialogTitle>
          <DialogDescription>Gửi lúc {new Date(feedback.createdAt).toLocaleString("vi-VN")}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sender Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                {isStudentFeedback ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                {isStudentFeedback ? "Thông tin sinh viên" : "Thông tin quán ăn"}
              </h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61]">
                    {isStudentFeedback ? feedback.student.avatar : feedback.restaurant.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{isStudentFeedback ? feedback.student.name : feedback.restaurant.name}</p>
                  <p className="text-sm text-gray-500">
                    {isStudentFeedback
                      ? `MSSV: ${feedback.student.studentId}`
                      : `Chủ quán: ${feedback.restaurant.owner}`}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">
                        {isStudentFeedback ? feedback.student.phone : feedback.restaurant.phone}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-3 w-3 mr-1" />
                      Gọi điện
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Content */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Nội dung phản hồi</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-lg">{feedback.subject}</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="text-gray-700 whitespace-pre-wrap">{feedback.message}</p>
                </div>

                {/* Related Order */}
                {feedback.orderId && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Đơn hàng liên quan</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Mã đơn: <strong>#{feedback.orderId}</strong>
                    </p>
                    {feedback.restaurant && (
                      <p className="text-sm text-blue-700">
                        Quán: <strong>{feedback.restaurant}</strong>
                      </p>
                    )}
                  </div>
                )}

                {/* Attachments */}
                {feedback.images && feedback.images.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">Hình ảnh đính kèm</span>
                    </div>
                    <div className="flex gap-2">
                      {feedback.images.map((image: string, index: number) => (
                        <div
                          key={index}
                          className="w-20 h-20 bg-gray-200 rounded border flex items-center justify-center"
                        >
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {feedback.attachments && feedback.attachments.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Paperclip className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">File đính kèm</span>
                    </div>
                    <div className="space-y-1">
                      {feedback.attachments.map((file: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer"
                        >
                          <Paperclip className="h-3 w-3" />
                          {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Response */}
            {feedback.adminResponse && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-green-800">Phản hồi của Admin</h3>
                <div className="bg-white rounded p-3">
                  <p className="text-gray-700">{feedback.adminResponse.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <span>Phản hồi bởi: {feedback.adminResponse.respondedBy}</span>
                    <span>•</span>
                    <span>{new Date(feedback.adminResponse.respondedAt).toLocaleString("vi-VN")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Priority */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Trạng thái & Ưu tiên</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Trạng thái hiện tại</p>
                  {getStatusBadge(feedback.status)}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Độ ưu tiên</p>
                  {getPriorityBadge(feedback.priority)}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Thời gian tạo</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-sm">{new Date(feedback.createdAt).toLocaleString("vi-VN")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Cập nhật trạng thái</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Trạng thái mới</p>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="in_review">Đang xem xét</SelectItem>
                      <SelectItem value="resolved">Đã xử lý</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Độ ưu tiên</p>
                  <Select value={newPriority} onValueChange={setNewPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="low">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Response Form */}
            {!feedback.adminResponse && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Phản hồi</h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Nhập phản hồi cho người gửi..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows={4}
                  />
                  <Button
                    onClick={handleSendResponse}
                    className="w-full bg-[#FF6F61] hover:bg-[#E55A4E] text-white"
                    disabled={!responseMessage.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Gửi phản hồi
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white">Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
