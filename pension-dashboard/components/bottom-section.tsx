import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Maximize2 } from "lucide-react"

export function BottomSection() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Stav úklidu */}
      <Card className="bg-white border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">Stav úklidu</CardTitle>
          <Maximize2 className="w-4 h-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">86%</span>
              <span className="text-gray-600">14%</span>
            </div>

            <div className="flex h-8 rounded-full overflow-hidden">
              <div className="bg-blue-500 flex-1" style={{ width: "86%" }}></div>
              <div className="bg-blue-100 flex-1 relative" style={{ width: "14%" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-transparent opacity-50"></div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Čisté</span>
                <span className="font-semibold ml-auto">169</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
                <span className="text-gray-600">Špinavé</span>
                <span className="font-semibold ml-auto">65</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Obsazenost pokojů */}
      <Card className="bg-white border-gray-100">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900">Obsazenost pokojů</CardTitle>
          <Maximize2 className="w-4 h-4 text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-end justify-between">
            {/* Simulace grafu */}
            <div className="flex-1 h-full relative">
              <svg className="w-full h-full" viewBox="0 0 300 100">
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  points="0,80 50,70 100,60 150,65 200,55 250,50 300,45"
                />
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  points="0,90 50,85 100,80 150,75 200,70 250,65 300,60"
                />
                <polyline
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  points="0,70 50,65 100,70 150,68 200,72 250,70 300,68"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>00:00</span>
            <span>03:00</span>
            <span>06:00</span>
            <span>09:00</span>
            <span>12:00</span>
            <span>15:00</span>
            <span>18:00</span>
            <span>21:00</span>
          </div>
        </CardContent>
      </Card>

      {/* Chat/Zprávy */}
      <Card className="bg-white border-gray-100">
        <CardContent className="p-0">
          <div className="space-y-3 p-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-xs bg-white text-blue-600">JC</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">Jane Cooper</span>
                <span className="text-xs opacity-75 ml-auto">15. srp, 14:25</span>
              </div>
              <p className="text-sm">Brýle nalezeny. Emma je přinesla na recepci!</p>
            </div>

            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-xs bg-white text-blue-600">CF</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">Cody Fisher</span>
                <span className="text-xs opacity-75 ml-auto">15. srp, 14:40</span>
              </div>
              <p className="text-sm">
                Ahoj týme, jen upozornění - velmi důležitý host se ubytoval v pokoji 56. Pojďme dvakrát zkontrolovat
                pokoj a ujistit se, že je vše perfektní. Děkuji!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
