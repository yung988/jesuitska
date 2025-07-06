import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Maximize2 } from "lucide-react"

export function ChartsSection() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* Nepřiřazené úkoly */}
      <Card className="bg-white border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">Nepřiřazené úkoly</CardTitle>
          <Maximize2 className="w-4 h-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-32 flex items-end gap-2">
              <div className="flex-1 bg-blue-100 h-16 rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-200 to-transparent opacity-50"></div>
              </div>
              <div className="flex-1 bg-blue-500 h-24 rounded-sm"></div>
              <div className="flex-1 bg-blue-800 h-12 rounded-sm"></div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
                <span className="text-gray-600">Údržba</span>
                <span className="font-semibold ml-auto">27</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-gray-600">Úklid</span>
                <span className="font-semibold ml-auto">34</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-800 rounded-sm"></div>
                <span className="text-gray-600">Úkoly</span>
                <span className="font-semibold ml-auto">16</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stavy úkolů */}
      <Card className="bg-white border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">Stavy úkolů</CardTitle>
          <Maximize2 className="w-4 h-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">234</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="bg-gray-900 text-white hover:bg-gray-900">
              Úklid
            </Badge>
            <Badge variant="outline">Údržba</Badge>
            <Badge variant="outline">Úkoly</Badge>
          </div>

          <div className="space-y-2 text-sm">
            {[
              { label: "Nezačato", count: 35, color: "bg-blue-200" },
              { label: "Probíhá", count: 58, color: "bg-blue-400" },
              { label: "Pozastaveno", count: 12, color: "bg-blue-300" },
              { label: "Dokončeno", count: 79, color: "bg-blue-600" },
              { label: "Zkontrolováno", count: 37, color: "bg-blue-500" },
              { label: "Neprovedeno", count: 7, color: "bg-blue-100" },
              { label: "Odmítnuto", count: 3, color: "bg-gray-300" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                <span className="text-gray-600 flex-1">{item.label}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Zaměstnanci online */}
      <Card className="bg-white border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">Zaměstnanci online</CardTitle>
          <Maximize2 className="w-4 h-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-right mb-4">
            <span className="text-xs text-gray-500">Poslední přístup</span>
          </div>

          <div className="space-y-4">
            {[
              { name: "Cody Fisher", role: "Generální manažer", time: "0h 5m", avatar: "CF" },
              { name: "Jane Cooper", role: "Supervisor", time: "1h 20m", avatar: "JC" },
              { name: "Marvin McKinney", role: "Supervisor", time: "2h 26m", avatar: "MM" },
              { name: "Jenny Wilson", role: "Pokojská", time: "2h 35m", avatar: "JW" },
            ].map((employee) => (
              <div key={employee.name} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold">
                  {employee.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">{employee.name}</div>
                  <div className="text-xs text-gray-500">{employee.role}</div>
                </div>
                <div className="text-xs text-blue-600 font-medium">{employee.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
