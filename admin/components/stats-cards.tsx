import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Bed, CreditCard, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Obsazenost",
    value: "85%",
    change: "+12%",
    changeType: "positive" as const,
    icon: Bed,
    description: "oproti minulému měsíci",
  },
  {
    title: "Aktivní rezervace",
    value: "24",
    change: "+3",
    changeType: "positive" as const,
    icon: Users,
    description: "nové rezervace tento týden",
  },
  {
    title: "Měsíční tržby",
    value: "186 500 Kč",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: CreditCard,
    description: "oproti minulému měsíci",
  },
  {
    title: "Průměrné hodnocení",
    value: "4.8",
    change: "+0.2",
    changeType: "positive" as const,
    icon: TrendingUp,
    description: "z 5 hvězdiček",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-amber-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <stat.icon className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                {stat.change}
              </Badge>
              <p className="text-xs text-slate-500">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
