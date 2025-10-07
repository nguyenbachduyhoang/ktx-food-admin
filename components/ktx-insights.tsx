"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, MapPin, TrendingUp, Star, Zap } from "lucide-react"

export function KTXInsights() {
  const insights = [
    {
      title: "Thời gian giao hàng trung bình",
      value: "11 phút",
      description: "Nhanh hơn 65% so với app truyền thống",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Tỷ lệ sinh viên hoạt động",
      value: "20.6%",
      description: "8,240 / 40,000+ sinh viên KTX khu B",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Phí ship trung bình",
      value: "2,500đ",
      description: "Thấp hơn 80% so với nền tảng lớn",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Đánh giá trung bình",
      value: "4.75★",
      description: "Từ 2,847 đánh giá trong tháng",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  const zones = [
    { name: "Tòa A1-A2", students: "~8,500", orders: 892, penetration: "10.5%" },
    { name: "Tòa B1-B2", students: "~7,200", orders: 756, penetration: "10.5%" },
    { name: "Tòa C1-C2", students: "~9,100", orders: 834, penetration: "9.2%" },
    { name: "Tòa D1-D2", students: "~8,800", orders: 974, penetration: "11.1%" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* KTX Insights */}
      <Card className="lg:col-span-2 bg-white border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Chỉ số KTX Food</CardTitle>
          <CardDescription className="text-gray-500">Hiệu suất vận hành nền tảng giao đồ ăn nội khu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 ${insight.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${insight.color}`} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{insight.value}</p>
                    <p className="text-sm font-medium text-gray-700">{insight.title}</p>
                    <p className="text-xs text-gray-500">{insight.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 p-4 bg-[#FF6F61]/5 rounded-lg border border-[#FF6F61]/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-[#FF6F61]" />
              <span className="text-sm font-medium text-[#FF6F61]">Thành tích nổi bật tháng này</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-gray-900">96.8%</p>
                <p className="text-xs text-gray-600">Đơn giao đúng hẹn</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">0đ</p>
                <p className="text-xs text-gray-600">Phí ship 78% đơn hàng</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">2.3</p>
                <p className="text-xs text-gray-600">Đơn/sinh viên/tuần</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Analysis */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">Phân tích theo khu vực</CardTitle>
          <CardDescription className="text-gray-500">Tỷ lệ thâm nhập từng tòa nhà KTX</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zones.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF6F61]/10 text-[#FF6F61] rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{zone.name}</p>
                    <p className="text-xs text-gray-500">{zone.students} sinh viên</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{zone.orders}</p>
                  <Badge variant="secondary" className="text-xs">
                    {zone.penetration}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Tiềm năng mở rộng:</span>
              <span className="text-lg font-bold text-blue-600">+31,760</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Sinh viên chưa sử dụng dịch vụ (79.4% thị trường)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
