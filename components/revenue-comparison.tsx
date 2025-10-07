"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const comparisonData = [
  {
    platform: "KTX Food",
    revenue: 84672000,
    commission: 8467200,
    commissionRate: 10,
  },
  {
    platform: "GrabFood",
    revenue: 84672000,
    commission: 21168000,
    commissionRate: 25,
  },
  {
    platform: "ShopeeFood",
    revenue: 84672000,
    commission: 19051200,
    commissionRate: 22.5,
  },
]

export function RevenueComparison() {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">So sánh hoa hồng</CardTitle>
        <CardDescription className="text-gray-500">
          Tiết kiệm chi phí cho quán ăn so với các nền tảng khác
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="platform" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name) => [
                  `${(value as number).toLocaleString()}đ`,
                  name === "commission" ? "Hoa hồng" : "Doanh thu",
                ]}
                labelFormatter={(label) => `Nền tảng: ${label}`}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#e5e7eb" name="Doanh thu" radius={[4, 4, 0, 0]} />
              <Bar dataKey="commission" fill="#FF6F61" name="Hoa hồng" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-800">Tiết kiệm cho quán ăn nội khu:</span>
            <span className="text-lg font-bold text-green-600">
              {((comparisonData[1].commission - comparisonData[0].commission) / 1000000).toFixed(1)}M đ/tháng
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            Với hoa hồng chỉ 10%, quán ăn tiết kiệm được 12.7M đồng mỗi tháng so với GrabFood
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
