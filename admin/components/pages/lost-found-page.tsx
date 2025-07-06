import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Package, Calendar, MapPin, User } from "lucide-react"

const lostItems = [
  {
    id: "LF001",
    item: "Brýle na čtení",
    description: "Černé brýle v hnědém pouzdře",
    location: "Pokoj 205",
    foundDate: "2025-01-15",
    foundBy: "Marie Nováková",
    status: "found",
    category: "Osobní věci",
    guestContact: "petr.svoboda@email.cz",
  },
  {
    id: "LF002",
    item: "iPhone 14",
    description: "Černý iPhone v modrém obalu",
    location: "Restaurace",
    foundDate: "2025-01-14",
    foundBy: "Jana Dvořáková",
    status: "returned",
    category: "Elektronika",
    guestContact: "+420 777 123 456",
  },
  {
    id: "LF003",
    item: "Zlatý náramek",
    description: "Tenký zlatý řetízek s přívěskem srdce",
    location: "Pokoj 103",
    foundDate: "2025-01-13",
    foundBy: "Tomáš Svoboda",
    status: "stored",
    category: "Šperky",
    guestContact: "Neznámý",
  },
  {
    id: "LF004",
    item: "Dětská hračka",
    description: "Plyšový medvídek, hnědý",
    location: "Lobby",
    foundDate: "2025-01-12",
    foundBy: "Pavel Novák",
    status: "claimed",
    category: "Hračky",
    guestContact: "marie.nova@email.cz",
  },
]

const statusConfig = {
  found: { label: "Nalezeno", color: "bg-blue-100 text-blue-800" },
  stored: { label: "Uskladněno", color: "bg-yellow-100 text-yellow-800" },
  returned: { label: "Vráceno", color: "bg-green-100 text-green-800" },
  claimed: { label: "Vyzvednuto", color: "bg-purple-100 text-purple-800" },
  disposed: { label: "Zlikvidováno", color: "bg-gray-100 text-gray-800" },
}

export function LostFoundPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ztráty a nálezy</h2>
          <p className="text-gray-600">Správa nalezených předmětů</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Přidat nález</Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Celkem předmětů</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Nově nalezené</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-gray-600">Uskladněné</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600">Vrácené</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">2</div>
            <div className="text-sm text-gray-600">Čeká na vyzvednutí</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Seznam nalezených předmětů</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Hledat předměty..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lostItems.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{item.item}</h3>
                        <Badge className="text-xs">{item.id}</Badge>
                        <Badge className={statusConfig[item.status as keyof typeof statusConfig].color}>
                          {statusConfig[item.status as keyof typeof statusConfig].label}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>

                      <p className="text-gray-600 mb-3">{item.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            Nalezeno: {item.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Datum: {new Date(item.foundDate).toLocaleDateString("cs-CZ")}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            Našel: {item.foundBy}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            Kontakt: {item.guestContact}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Kontaktovat
                    </Button>
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
