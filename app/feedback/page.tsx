"use client"

import { useState } from "react"
import { Search, Star, MessageCircle, ThumbsUp, AlertTriangle, Eye, Download, Users, Building2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedbackDetailModal } from "@/components/feedback-detail-modal"
import { ReviewDetailModal } from "@/components/review-detail-modal"

export default function FeedbackPage() {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [selectedReview, setSelectedReview] = useState(null)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  // Mock data for student feedback
  const studentFeedback = [
    {
      id: "FB001",
      student: {
        name: "Nguyễn Văn A",
        studentId: "20120001",
        avatar: "NA",
        phone: "0901234567",
      },
      type: "complaint",
      subject: "Đơn hàng giao muộn",
      message:
        "Đơn hàng KTX001 đã giao muộn 30 phút so với thời gian dự kiến. Món ăn bị nguội và không ngon như mong đợi.",
      orderId: "KTX001",
      restaurant: "Cơm Tấm Cô Ba",
      priority: "high",
      status: "pending",
      createdAt: "2024-01-15 20:30:00",
      adminResponse: null,
      images: ["complaint1.jpg"],
    },
    {
      id: "FB002",
      student: {
        name: "Trần Thị B",
        studentId: "20120002",
        avatar: "TB",
        phone: "0901234568",
      },
      type: "suggestion",
      subject: "Thêm tính năng đặt trước",
      message: "Mong app có thể thêm tính năng đặt món trước 1-2 tiếng để không phải chờ đợi lâu vào giờ cao điểm.",
      orderId: null,
      restaurant: null,
      priority: "medium",
      status: "resolved",
      createdAt: "2024-01-14 15:20:00",
      adminResponse: {
        message: "Cảm ơn bạn đã góp ý! Chúng tôi sẽ cân nhắc thêm tính năng này trong phiên bản tới.",
        respondedBy: "Admin",
        respondedAt: "2024-01-14 16:45:00",
      },
      images: [],
    },
    {
      id: "FB003",
      student: {
        name: "Lê Minh C",
        studentId: "20120003",
        avatar: "LC",
        phone: "0901234569",
      },
      type: "compliment",
      subject: "Dịch vụ tuyệt vời",
      message:
        "App rất tiện lợi, giao hàng nhanh và món ăn ngon. Đặc biệt thích tính năng miễn phí ship cho sinh viên KTX.",
      orderId: "KTX003",
      restaurant: "Trà Sữa Gong Cha Mini",
      priority: "low",
      status: "resolved",
      createdAt: "2024-01-13 18:15:00",
      adminResponse: {
        message: "Cảm ơn bạn đã ủng hộ KTX Food! Chúng tôi sẽ tiếp tục cải thiện dịch vụ.",
        respondedBy: "Admin",
        respondedAt: "2024-01-13 19:00:00",
      },
      images: [],
    },
  ]

  // Mock data for restaurant feedback
  const restaurantFeedback = [
    {
      id: "RF001",
      restaurant: {
        name: "Cơm Tấm Cô Ba",
        owner: "Nguyễn Thị Ba",
        phone: "0987654321",
        avatar: "CB",
      },
      type: "complaint",
      subject: "Hoa hồng quá cao",
      message:
        "Tỷ lệ hoa hồng 10% có vẻ cao so với các nền tảng khác. Mong admin xem xét giảm xuống 8% để hỗ trợ quán ăn nội khu.",
      priority: "high",
      status: "in_review",
      createdAt: "2024-01-15 14:30:00",
      adminResponse: null,
      attachments: ["revenue_comparison.pdf"],
    },
    {
      id: "RF002",
      restaurant: {
        name: "Bánh Mì Chảo 3K",
        owner: "Trần Văn Minh",
        phone: "0987654322",
        avatar: "BM",
      },
      type: "suggestion",
      subject: "Thêm tính năng quản lý menu",
      message:
        "Mong có thể thêm tính năng cho quán tự quản lý menu, cập nhật giá và trạng thái món ăn trực tiếp trên app.",
      priority: "medium",
      status: "resolved",
      createdAt: "2024-01-12 10:15:00",
      adminResponse: {
        message: "Chúng tôi đang phát triển tính năng này và sẽ ra mắt trong tháng tới.",
        respondedBy: "Admin",
        respondedAt: "2024-01-12 14:20:00",
      },
      attachments: [],
    },
  ]

  // Mock data for restaurant reviews
  const restaurantReviews = [
    {
      id: "RV001",
      student: {
        name: "Nguyễn Văn A",
        studentId: "20120001",
        avatar: "NA",
      },
      restaurant: {
        name: "Cơm Tấm Cô Ba",
        id: "R001",
      },
      orderId: "KTX001",
      rating: 5,
      review: "Cơm tấm rất ngon, sườn nướng thơm phức. Giao hàng nhanh chóng, đóng gói cẩn thận. Sẽ đặt lại!",
      images: ["review1.jpg", "review2.jpg"],
      createdAt: "2024-01-15 19:00:00",
      helpful: 12,
      reported: false,
      restaurantResponse: {
        message: "Cảm ơn bạn đã ủng hộ quán! Quán sẽ tiếp tục cố gắng để mang đến những món ăn ngon nhất.",
        respondedAt: "2024-01-15 20:30:00",
      },
    },
    {
      id: "RV002",
      student: {
        name: "Trần Thị B",
        studentId: "20120002",
        avatar: "TB",
      },
      restaurant: {
        name: "Bánh Mì Chảo 3K",
        id: "R002",
      },
      orderId: "KTX002",
      rating: 4,
      review: "Bánh mì chảo ngon, giá cả hợp lý. Tuy nhiên hôm nay giao hơi chậm, mong quán cải thiện.",
      images: [],
      createdAt: "2024-01-15 12:30:00",
      helpful: 8,
      reported: false,
      restaurantResponse: null,
    },
    {
      id: "RV003",
      student: {
        name: "Lê Minh C",
        studentId: "20120003",
        avatar: "LC",
      },
      restaurant: {
        name: "Trà Sữa Gong Cha Mini",
        id: "R003",
      },
      orderId: "KTX003",
      rating: 5,
      review: "Trà sữa rất ngon, trân châu dai và ngọt vừa phải. Đóng gói kỹ càng, không bị tràn. Highly recommended!",
      images: ["review3.jpg"],
      createdAt: "2024-01-14 16:45:00",
      helpful: 15,
      reported: false,
      restaurantResponse: {
        message: "Thank you so much! Quán rất vui khi được bạn yêu thích. Hẹn gặp lại bạn!",
        respondedAt: "2024-01-14 18:00:00",
      },
    },
    {
      id: "RV004",
      student: {
        name: "Phạm Thị D",
        studentId: "20120004",
        avatar: "PD",
      },
      restaurant: {
        name: "Phở Hà Nội Mini",
        id: "R004",
      },
      orderId: "KTX004",
      rating: 2,
      review: "Phở không đúng vị, nước dùng nhạt và thịt bò hơi dai. Giá cả không tương xứng với chất lượng.",
      images: [],
      createdAt: "2024-01-13 20:15:00",
      helpful: 3,
      reported: true,
      restaurantResponse: {
        message: "Quán xin lỗi về trải nghiệm không tốt. Chúng tôi sẽ cải thiện công thức và chất lượng nguyên liệu.",
        respondedAt: "2024-01-14 09:30:00",
      },
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "suggestion":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "compliment":
        return <ThumbsUp className="h-4 w-4 text-green-500" />
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}/5</span>
      </div>
    )
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} ngày trước`
    }
  }

  const handleViewFeedback = (feedback: any) => {
    setSelectedFeedback(feedback)
    setIsFeedbackModalOpen(true)
  }

  const handleViewReview = (review: any) => {
    setSelectedReview(review)
    setIsReviewModalOpen(true)
  }

  // Stats calculation
  const feedbackStats = {
    totalStudentFeedback: studentFeedback.length,
    totalRestaurantFeedback: restaurantFeedback.length,
    totalReviews: restaurantReviews.length,
    avgRating: (restaurantReviews.reduce((sum, r) => sum + r.rating, 0) / restaurantReviews.length).toFixed(1),
    pendingFeedback: [...studentFeedback, ...restaurantFeedback].filter((f) => f.status === "pending").length,
    complaints: [...studentFeedback, ...restaurantFeedback].filter((f) => f.type === "complaint").length,
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Phản hồi & Đánh giá</h1>
          <p className="text-sm text-gray-500">Quản lý phản hồi từ sinh viên, chủ quán và đánh giá quán ăn</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{feedbackStats.totalStudentFeedback}</p>
              <p className="text-sm text-gray-500">Phản hồi SV</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{feedbackStats.totalRestaurantFeedback}</p>
              <p className="text-sm text-gray-500">Phản hồi quán</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{feedbackStats.totalReviews}</p>
              <p className="text-sm text-gray-500">Đánh giá</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{feedbackStats.avgRating}★</p>
              <p className="text-sm text-gray-500">Điểm TB</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{feedbackStats.pendingFeedback}</p>
              <p className="text-sm text-gray-500">Chờ xử lý</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{feedbackStats.complaints}</p>
              <p className="text-sm text-gray-500">Khiếu nại</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="student-feedback" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="student-feedback">Phản hồi sinh viên</TabsTrigger>
          <TabsTrigger value="restaurant-feedback">Phản hồi quán ăn</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá quán ăn</TabsTrigger>
        </TabsList>

        {/* Student Feedback Tab */}
        <TabsContent value="student-feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Phản hồi từ sinh viên
              </CardTitle>
              <CardDescription>Khiếu nại, góp ý và khen ngợi từ sinh viên KTX</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm theo tên sinh viên, nội dung..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Loại phản hồi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả loại</SelectItem>
                    <SelectItem value="complaint">Khiếu nại</SelectItem>
                    <SelectItem value="suggestion">Góp ý</SelectItem>
                    <SelectItem value="compliment">Khen ngợi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sinh viên</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Quán ăn</TableHead>
                    <TableHead>Độ ưu tiên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentFeedback.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61] text-xs">
                              {feedback.student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{feedback.student.name}</p>
                            <p className="text-xs text-gray-500">{feedback.student.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(feedback.type)}
                          {getTypeBadge(feedback.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{feedback.subject}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{feedback.message}</p>
                      </TableCell>
                      <TableCell>
                        {feedback.restaurant ? (
                          <Badge variant="outline">{feedback.restaurant}</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getPriorityBadge(feedback.priority)}</TableCell>
                      <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                      <TableCell>
                        <p className="text-sm">{getTimeAgo(feedback.createdAt)}</p>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewFeedback(feedback)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Restaurant Feedback Tab */}
        <TabsContent value="restaurant-feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Phản hồi từ quán ăn
              </CardTitle>
              <CardDescription>Khiếu nại và góp ý từ các chủ quán ăn</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quán ăn</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Độ ưu tiên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restaurantFeedback.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61] text-xs">
                              {feedback.restaurant.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{feedback.restaurant.name}</p>
                            <p className="text-xs text-gray-500">{feedback.restaurant.owner}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(feedback.type)}
                          {getTypeBadge(feedback.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{feedback.subject}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{feedback.message}</p>
                      </TableCell>
                      <TableCell>{getPriorityBadge(feedback.priority)}</TableCell>
                      <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                      <TableCell>
                        <p className="text-sm">{getTimeAgo(feedback.createdAt)}</p>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewFeedback(feedback)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Đánh giá quán ăn
              </CardTitle>
              <CardDescription>Đánh giá và nhận xét từ sinh viên về các quán ăn</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm theo tên quán, sinh viên..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Lọc theo điểm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả điểm</SelectItem>
                    <SelectItem value="5">5 sao</SelectItem>
                    <SelectItem value="4">4 sao</SelectItem>
                    <SelectItem value="3">3 sao</SelectItem>
                    <SelectItem value="2">2 sao</SelectItem>
                    <SelectItem value="1">1 sao</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sinh viên</TableHead>
                    <TableHead>Quán ăn</TableHead>
                    <TableHead>Đánh giá</TableHead>
                    <TableHead>Nội dung</TableHead>
                    <TableHead>Hữu ích</TableHead>
                    <TableHead>Phản hồi quán</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restaurantReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#FF6F61]/10 text-[#FF6F61] text-xs">
                              {review.student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{review.student.name}</p>
                            <p className="text-xs text-gray-500">{review.student.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{review.restaurant.name}</p>
                        <p className="text-xs text-gray-500">#{review.orderId}</p>
                      </TableCell>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell>
                        <p className="text-sm truncate max-w-xs">{review.review}</p>
                        {review.images.length > 0 && (
                          <Badge variant="outline" className="mt-1">
                            {review.images.length} ảnh
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3 text-green-500" />
                          <span className="text-sm">{review.helpful}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {review.restaurantResponse ? (
                          <Badge className="bg-green-100 text-green-800">Đã phản hồi</Badge>
                        ) : (
                          <Badge variant="outline">Chưa phản hồi</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{getTimeAgo(review.createdAt)}</p>
                        {review.reported && <Badge className="bg-red-100 text-red-800 mt-1">Bị báo cáo</Badge>}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewReview(review)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <FeedbackDetailModal
        feedback={selectedFeedback}
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

      <ReviewDetailModal
        review={selectedReview}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  )
}
