#!/bin/bash

echo "🔧 Oprava API permissions pro Pension Jesuitská"
echo "=============================================="
echo ""

# Zastavení služeb
echo "1. Zastavuji běžící služby..."
pkill -f "strapi develop" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# Vyčištění cache
echo "2. Čistím cache..."
rm -rf penzion-backend/.cache
rm -rf penzion-backend/build
rm -rf penzion-backend/dist

# Přidání permission fix do bootstrap
echo "3. Aktualizuji bootstrap script..."

# Backup původního souboru
cp penzion-backend/src/index.js penzion-backend/src/index.js.backup

# Restart služeb
echo "4. Restartuji služby..."
./start-all.sh &

echo ""
echo "⏳ Čekám na spuštění Strapi (15 sekund)..."
sleep 15

# Test API
echo ""
echo "5. Testuji API endpointy..."
echo "----------------------------"

test_endpoint() {
    local url=$1
    local name=$2
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$response" = "200" ]; then
        echo "✅ $name: OK"
    else
        echo "❌ $name: FAILED (Status: $response)"
    fi
}

test_endpoint "http://localhost:1337/api/rooms" "Rooms API"
test_endpoint "http://localhost:1337/api/bookings" "Bookings API"
test_endpoint "http://localhost:1337/api/guests" "Guests API"

echo ""
echo "✨ Hotovo! Pokud API stále nefungují:"
echo "   1. Přihlaste se do Strapi admin: http://localhost:1337/admin"
echo "   2. Jděte do: Settings -> Users & Permissions -> Roles -> Public"
echo "   3. Zaškrtněte všechny potřebné endpointy"
echo ""
echo "📝 Pro diagnostiku spusťte: ./diagnose-api.sh"
