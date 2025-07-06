import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Maximize2 } from "lucide-react"

const stats = [
  {
    title: "Úklid",
    value: "32",
    total: "95",
    change: "+5%",
    changeType: "positive",
    overtime: "Přesčas: 1h 5m",
    color: "bg-white",
  },
  {
    title: "Údržba",
    value: "26",
    total: "65",
    change: "+11%",
    changeType: "positive",
    overtime: "Přesčas: 2h 13m",
    color: "bg-white",
  },
  {
    title: "Úkoly",
    value: "1",
    total: "34",
    change: "-10%",
    changeType: "negative",
    overtime: "Přesčas: 0h 13m",
    color: "bg-white",
  },
  {
    title: "Poznámky",
    value: "23",
    total: "",
    change: "-5%",
    changeType: "negative",
    overtime: "06:00 - 09:00",
    color: "bg-gray-900 text-white",
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={stat.title} className={`${stat.color} border-gray-100 relative`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-medium ${stat.color.includes("gray-900") ? "text-white" : "text-gray-700"}`}>
                {stat.title}
              </h3>
              <Maximize2 className={`w-4 h-4 ${stat.color.includes("gray-900") ? "text-white" : "text-gray-400"}`} />
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span
                className={`text-4xl font-bold ${stat.color.includes("gray-900") ? "text-white" : "text-gray-900"}`}
              >
                {stat.value}
              </span>
              {stat.total && (
                <span className={`text-xl ${stat.color.includes("gray-900") ? "text-gray-300" : "text-gray-500"}`}>
                  /{stat.total}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.changeType === "positive" ? "text-red-500" : "text-green-500"
                }`}
              >
                {stat.changeType === "positive" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </div>
              <span className={`text-xs ${stat.color.includes("gray-900") ? "text-gray-400" : "text-gray-500"}`}>
                {stat.overtime}
              </span>
            </div>

            {index === 3 && (
              <div className="mt-4">
                <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded opacity-20"></div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
