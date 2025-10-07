"use client"

import { useState } from "react"
import { Settings, Bell, Shield, CreditCard, Globe, Smartphone, Mail, Lock, Eye, EyeOff, Save } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    newOrders: true,
    newRestaurants: true,
    paymentReminders: true,
    systemUpdates: false,
    emailReports: true,
    smsAlerts: false,
  })

  const [systemSettings, setSystemSettings] = useState({
    commissionRate: 10,
    deliveryRadius: 2,
    minOrderValue: 15000,
    maxDeliveryTime: 30,
    operatingHours: {
      start: "06:00",
      end: "23:00",
    },
    autoApproveRestaurants: false,
    requireOrderConfirmation: true,
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Cài đặt hệ thống</h1>
          <p className="text-sm text-gray-500">Quản lý cấu hình và tùy chỉnh KTX Food</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Chung</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="business">Kinh doanh</TabsTrigger>
          <TabsTrigger value="integrations">Tích hợp</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Thông tin chung
              </CardTitle>
              <CardDescription>Cấu hình cơ bản của hệ thống KTX Food</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Tên nền tảng</Label>
                  <Input id="platformName" defaultValue="KTX Food" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Email hỗ trợ</Label>
                  <Input id="supportEmail" defaultValue="support@ktxfood.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Hotline hỗ trợ</Label>
                  <Input id="supportPhone" defaultValue="1900-1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <Select defaultValue="asia/ho_chi_minh">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia/ho_chi_minh">Asia/Ho_Chi_Minh (GMT+7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả nền tảng</Label>
                <Textarea
                  id="description"
                  defaultValue="Nền tảng giao đồ ăn nội khu KTX với chi phí thấp và thời gian giao hàng nhanh"
                  rows={3}
                />
              </div>
              <Button className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white">
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Giờ hoạt động</CardTitle>
              <CardDescription>Thời gian hệ thống cho phép đặt hàng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Giờ mở cửa</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={systemSettings.operatingHours.start}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        operatingHours: { ...systemSettings.operatingHours, start: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Giờ đóng cửa</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={systemSettings.operatingHours.end}
                    onChange={(e) =>
                      setSystemSettings({
                        ...systemSettings,
                        operatingHours: { ...systemSettings.operatingHours, end: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Cài đặt thông báo
              </CardTitle>
              <CardDescription>Quản lý các loại thông báo và cảnh báo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Đơn hàng mới</p>
                    <p className="text-sm text-gray-500">Thông báo khi có đơn hàng mới</p>
                  </div>
                  <Switch
                    checked={notifications.newOrders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Quán ăn mới đăng ký</p>
                    <p className="text-sm text-gray-500">Thông báo khi có quán ăn mới</p>
                  </div>
                  <Switch
                    checked={notifications.newRestaurants}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newRestaurants: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nhắc nhở thanh toán</p>
                    <p className="text-sm text-gray-500">Nhắc nhở thanh toán hoa hồng</p>
                  </div>
                  <Switch
                    checked={notifications.paymentReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cập nhật hệ thống</p>
                    <p className="text-sm text-gray-500">Thông báo về bảo trì và cập nhật</p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Báo cáo email</p>
                    <p className="text-sm text-gray-500">Gửi báo cáo hàng tuần qua email</p>
                  </div>
                  <Switch
                    checked={notifications.emailReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailReports: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cảnh báo SMS</p>
                    <p className="text-sm text-gray-500">Gửi cảnh báo khẩn cấp qua SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bảo mật tài khoản
              </CardTitle>
              <CardDescription>Quản lý mật khẩu và bảo mật</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu hiện tại"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input id="newPassword" type="password" placeholder="Nhập mật khẩu mới" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                  <Input id="confirmPassword" type="password" placeholder="Nhập lại mật khẩu mới" />
                </div>
              </div>
              <Button className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white">
                <Lock className="h-4 w-4 mr-2" />
                Cập nhật mật khẩu
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phiên đăng nhập</CardTitle>
              <CardDescription>Quản lý các phiên đăng nhập hoạt động</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Chrome trên Windows</p>
                      <p className="text-sm text-gray-500">IP: 192.168.1.100 • Hiện tại</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Cài đặt kinh doanh
              </CardTitle>
              <CardDescription>Cấu hình các thông số kinh doanh</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Tỷ lệ hoa hồng (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    value={systemSettings.commissionRate}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, commissionRate: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryRadius">Bán kính giao hàng (km)</Label>
                  <Input
                    id="deliveryRadius"
                    type="number"
                    value={systemSettings.deliveryRadius}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, deliveryRadius: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrderValue">Giá trị đơn hàng tối thiểu (đ)</Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    value={systemSettings.minOrderValue}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, minOrderValue: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDeliveryTime">Thời gian giao hàng tối đa (phút)</Label>
                  <Input
                    id="maxDeliveryTime"
                    type="number"
                    value={systemSettings.maxDeliveryTime}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, maxDeliveryTime: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tự động duyệt quán ăn mới</p>
                    <p className="text-sm text-gray-500">Quán ăn mới sẽ được duyệt tự động</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoApproveRestaurants}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, autoApproveRestaurants: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Yêu cầu xác nhận đơn hàng</p>
                    <p className="text-sm text-gray-500">Quán ăn phải xác nhận đơn hàng</p>
                  </div>
                  <Switch
                    checked={systemSettings.requireOrderConfirmation}
                    onCheckedChange={(checked) =>
                      setSystemSettings({ ...systemSettings, requireOrderConfirmation: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Tích hợp bên thứ ba
              </CardTitle>
              <CardDescription>Kết nối với các dịch vụ bên ngoài</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Service (SMTP)</p>
                      <p className="text-sm text-gray-500">Gửi email thông báo và báo cáo</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Cấu hình
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">SMS Gateway</p>
                      <p className="text-sm text-gray-500">Gửi tin nhắn SMS thông báo</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Cấu hình
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Gateway</p>
                      <p className="text-sm text-gray-500">Tích hợp thanh toán online</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Cấu hình
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
