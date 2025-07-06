import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Package, AlertTriangle, TrendingDown, TrendingUp, Search } from "lucide-react"

const stockItems = [
  {
    id: "ST001",
    name: "Ručníky - bílé",
    category: "Textil",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    unit: "ks",
    location: "Sklad A1",
    lastRestocked: "2025-01-20",
    supplier: "Hotel Textil s.r.o.",
    status: "good",
  },
  {
    id: "ST002",
    name: "Toaletní papír",
    category: "Hygiena",
    currentStock: 8,
    minStock: 15,
    maxStock: 50,
    unit: "balení",
    location: "Sklad B2",
    lastRestocked: "2025-01-18",
    supplier: "Hygiene Plus",
    status: "low",
  },
  {
    id: "ST003",
    name: "Káva - zrnková",
    category: "F&B",
    currentStock: 12,
    minStock: 5,
    maxStock: 25,
    unit: "kg",
    location: "Kuchyň",
    lastRestocked: "2025-01-22",
    supplier: "Coffee Masters",
    status: "good",
  },
  {
    id: "ST004",
    name: "Čisticí prostředky",
    category: "Úklid",
    currentStock: 3,
    minStock: 10,
    maxStock: 30,
    unit: "l",
    location: "Úklidová místnost",
    lastRestocked: "2025-01-15",
    supplier: "Clean Pro",
    status: "critical",
  },
]

const statusConfig = {
  good: { label: "Dostatečné", color: "bg-green-100 text-green-800" },
  low: { label: "Nízké", color: "bg-yellow-100 text-yellow-800" },
  critical: { label: "Kritické", color: "bg-red-100 text-red-800" },
  overstock: { label: "Přebytek", color: "bg-blue-100 text-blue-800" },
}

export function StockPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Správa skladu</h2>
          <p className="text-gray-600">Přehled zásob a objednávky</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Nová objednávka</Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="text-sm text-gray-600">Celkem položek</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-600">Dostatečné zásoby</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">12</div>
            <div className="text-sm text-gray-600">Nízké zásoby</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">5</div>
            <div className="text-sm text-gray-600">Kritické zásoby</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-sm text-gray-600">Čekající objednávky</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Skladové zásoby</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      placeholder="Hledat položky..."
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockItems.map((item) => {
                  const stockPercentage = (item.currentStock / item.maxStock) * 100
                  return (
                    <div key={item.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.category} • {item.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusConfig[item.status as keyof typeof statusConfig].color}>
                            {statusConfig[item.status as keyof typeof statusConfig].label}
                          </Badge>
                          <Badge variant="outline">{item.id}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Aktuální zásoba</span>
                          <span className="font-medium">
                            {item.currentStock} / {item.maxStock} {item.unit}
                          </span>
                        </div>
                        <Progress value={stockPercentage} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>
                            Min: {item.minStock} {item.unit}
                          </span>
                          <span>
                            Max: {item.maxStock} {item.unit}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span>Poslední doplnění: {new Date(item.lastRestocked).toLocaleDateString("cs-CZ")}</span>
                          <span>Dodavatel: {item.supplier}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Objednat
                          </Button>
                          <Button variant="outline" size="sm">
                            Detail
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Kritické zásoby
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stockItems
                  .filter((item) => item.status === "critical" || item.status === "low")
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.currentStock} {item.unit} zbývá
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Objednat
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rychlé akce</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Nová položka
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Příjem zboží
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <TrendingDown className="w-4 h-4 mr-2" />
                Výdej zboží
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Inventura
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistiky</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Hodnota skladu</span>
                <span className="font-semibold">245,600 Kč</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Měsíční spotřeba</span>
                <span className="font-semibold">89,200 Kč</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Průměrná doba dodání</span>
                <span className="font-semibold">3.2 dne</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
