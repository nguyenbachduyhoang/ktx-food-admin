"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X, MapPin, Clock, Phone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface RestaurantFormModalProps {
  restaurant?: any
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => void
  mode: "create" | "edit"
}

export function RestaurantFormModal({ restaurant, isOpen, onClose, onSave, mode }: RestaurantFormModalProps) {
  const [formData, setFormData] = useState({
    name: restaurant?.name || "",
    category: restaurant?.category || "",
    owner: restaurant?.owner || "",
    phone: restaurant?.phone || "",
    email: restaurant?.email || "",
    location: restaurant?.location || "",
    description: restaurant?.description || "",
    operatingHours: {
      start: restaurant?.operatingHours?.start || "06:00",
      end: restaurant?.operatingHours?.end || "22:00",
    },
    specialties: restaurant?.specialties || [],
    commissionRate: restaurant?.commissionRate || 10,
    isActive: restaurant?.status === "active" || true,
    requiresApproval: restaurant?.status === "pending" || false,
  })

  const [newSpecialty, setNewSpecialty] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: restaurant?.id || `R${Date.now()}`,
      status: formData.isActive ? "active" : "inactive",
      joinDate: restaurant?.joinDate || new Date().toISOString().split("T")[0],
    })
    onClose()
  }

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()],
      })
      setNewSpecialty("")
    }
  }

  const removeSpecialty = (index: number) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index),
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Thêm quán ăn mới" : "Chỉnh sửa quán ăn"}</DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Điền thông tin để thêm quán ăn mới vào hệ thống" : "Cập nhật thông tin quán ăn"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên quán ăn *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Cơm Tấm Cô Ba"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Loại món *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại món" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cơm">Cơm</SelectItem>
                  <SelectItem value="Bánh mì">Bánh mì</SelectItem>
                  <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                  <SelectItem value="Phở">Phở</SelectItem>
                  <SelectItem value="Lẩu">Lẩu</SelectItem>
                  <SelectItem value="Chè">Chè</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Owner Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="owner">Chủ quán *</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                placeholder="VD: Nguyễn Thị Ba"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0987654321"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Vị trí *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="VD: Gần cổng chính KTX"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả quán</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Mô tả ngắn về quán ăn..."
              rows={3}
            />
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Giờ hoạt động
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Giờ mở cửa</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.operatingHours.start}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, start: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Giờ đóng cửa</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.operatingHours.end}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operatingHours: { ...formData.operatingHours, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-4">
            <Label>Món đặc trưng</Label>
            <div className="flex gap-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="VD: Cơm tấm sườn nướng"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpecialty())}
              />
              <Button type="button" onClick={addSpecialty} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {specialty}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpecialty(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Commission Rate */}
          <div className="space-y-2">
            <Label htmlFor="commissionRate">Tỷ lệ hoa hồng (%)</Label>
            <Input
              id="commissionRate"
              type="number"
              min="0"
              max="100"
              value={formData.commissionRate}
              onChange={(e) => setFormData({ ...formData, commissionRate: Number.parseInt(e.target.value) })}
            />
          </div>

          {/* Status Switches */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Kích hoạt quán</p>
                <p className="text-sm text-gray-500">Cho phép quán nhận đơn hàng</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Yêu cầu duyệt</p>
                <p className="text-sm text-gray-500">Quán cần được admin duyệt</p>
              </div>
              <Switch
                checked={formData.requiresApproval}
                onCheckedChange={(checked) => setFormData({ ...formData, requiresApproval: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-[#FF6F61] hover:bg-[#E55A4E] text-white">
              {mode === "create" ? "Thêm quán" : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
