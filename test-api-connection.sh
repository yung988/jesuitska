#!/bin/bash

# Barvy pro výstup
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URL konfigurace
BACKEND_URL="http://localhost:1337"
FRONTEND_URL="http://localhost:3000"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Test API propojení - Pension Jesuitská${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Funkce pro test endpointu
test_endpoint() {
    local url=$1
    local description=$2
    local expected_status=${3:-200}
    
    echo -n "Testing $description... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" = "$expected_status" ]; then
        echo -e "${GREEN}✓ OK${NC} (Status: $response)"
        return 0
    else
        echo -e "${RED}✗ FAILED${NC} (Expected: $expected_status, Got: $response)"
        return 1
    fi
}

# Funkce pro test API s daty
test_api_with_data() {
    local url=$1
    local description=$2
    
    echo -e "\n${YELLOW}Testing $description:${NC}"
    
    response=$(curl -s "$url")
    http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$http_code" = "200" ]; then
        echo -e "Status: ${GREEN}$http_code OK${NC}"
        
        # Kontrola, zda response obsahuje data
        if echo "$response" | grep -q '"data"'; then
            # Počet záznamů
            count=$(echo "$response" | jq '.data | length' 2>/dev/null || echo "N/A")
            echo -e "Records found: ${BLUE}$count${NC}"
            
            # Zobraz první záznam pokud existuje
            if [ "$count" != "0" ] && [ "$count" != "N/A" ]; then
                echo "Sample data:"
                echo "$response" | jq '.data[0]' 2>/dev/null | head -20
            fi
        else
            echo -e "${YELLOW}Response doesn't contain 'data' field${NC}"
            echo "Response: $response" | head -50
        fi
    else
        echo -e "Status: ${RED}$http_code FAILED${NC}"
        echo "Error response: $response"
    fi
}

# 1. Kontrola, zda běží služby
echo -e "${BLUE}1. Kontrola běžících služeb${NC}"
echo "--------------------------------"

# Kontrola Strapi
if lsof -i:1337 > /dev/null 2>&1; then
    echo -e "Strapi backend: ${GREEN}✓ Running${NC}"
else
    echo -e "Strapi backend: ${RED}✗ Not running${NC}"
    echo -e "${YELLOW}Tip: Spusťte './start-all.sh' pro start všech služeb${NC}"
fi

# Kontrola Next.js
if lsof -i:3000 > /dev/null 2>&1; then
    echo -e "Next.js frontend: ${GREEN}✓ Running${NC}"
else
    echo -e "Next.js frontend: ${RED}✗ Not running${NC}"
fi

echo ""

# 2. Test základních endpointů
echo -e "${BLUE}2. Test základních endpointů${NC}"
echo "--------------------------------"

test_endpoint "$BACKEND_URL" "Strapi backend root" "200"
test_endpoint "$BACKEND_URL/admin" "Strapi admin panel" "200"
test_endpoint "$FRONTEND_URL" "Next.js frontend" "200"

echo ""

# 3. Test API endpointů
echo -e "${BLUE}3. Test Strapi API endpointů${NC}"
echo "--------------------------------"

# Test jednotlivých API
test_api_with_data "$BACKEND_URL/api/rooms" "Rooms API"
test_api_with_data "$BACKEND_URL/api/bookings" "Bookings API"
test_api_with_data "$BACKEND_URL/api/guests" "Guests API"
test_api_with_data "$BACKEND_URL/api/wine-cellars" "Wine Cellars API"
test_api_with_data "$BACKEND_URL/api/concierge-services" "Concierge Services API"

echo ""

# 4. Test custom endpointů
echo -e "${BLUE}4. Test custom endpointů${NC}"
echo "--------------------------------"

# Test dostupnosti pokojů
check_in=$(date +%Y-%m-%d)
check_out=$(date -v+1d +%Y-%m-%d 2>/dev/null || date -d "+1 day" +%Y-%m-%d)
availability_url="$BACKEND_URL/api/rooms/available?checkIn=$check_in&checkOut=$check_out"

echo -e "\n${YELLOW}Testing room availability endpoint:${NC}"
echo "URL: $availability_url"

response=$(curl -s "$availability_url")
http_code=$(curl -s -o /dev/null -w "%{http_code}" "$availability_url")

if [ "$http_code" = "200" ]; then
    echo -e "Status: ${GREEN}$http_code OK${NC}"
    echo "Response preview:"
    echo "$response" | jq '.' 2>/dev/null | head -20 || echo "$response" | head -20
else
    echo -e "Status: ${RED}$http_code FAILED${NC}"
    echo "Response: $response"
fi

echo ""

# 5. Test CORS
echo -e "${BLUE}5. Test CORS konfigurace${NC}"
echo "--------------------------------"

cors_response=$(curl -s -H "Origin: http://localhost:3000" \
    -H "Access-Control-Request-Method: GET" \
    -H "Access-Control-Request-Headers: X-Requested-With" \
    -X OPTIONS "$BACKEND_URL/api/rooms" -I 2>/dev/null | grep -i "access-control-allow-origin")

if [ ! -z "$cors_response" ]; then
    echo -e "CORS headers: ${GREEN}✓ Present${NC}"
    echo "$cors_response"
else
    echo -e "CORS headers: ${RED}✗ Missing${NC}"
    echo -e "${YELLOW}Tip: Zkontrolujte config/middlewares.js${NC}"
fi

echo ""

# 6. Test frontend API volání
echo -e "${BLUE}6. Test frontend stránek s API voláním${NC}"
echo "--------------------------------"

# Test hlavní stránky
test_endpoint "$FRONTEND_URL/" "Homepage"

# Test rezervační stránky
test_endpoint "$FRONTEND_URL/rezervace" "Booking page"

# Test dashboard
test_endpoint "$FRONTEND_URL/dashboard" "Dashboard page"

echo ""

# 7. Souhrn
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Souhrn testů${NC}"
echo -e "${BLUE}========================================${NC}"

# Počítání úspěšných testů
total_tests=0
successful_tests=0

# Zde byste mohli přidat logiku pro počítání testů

echo -e "\n${GREEN}Test dokončen!${NC}"
echo ""
echo -e "${YELLOW}Další kroky:${NC}"
echo "1. Pokud některé API vrací 404, zkontrolujte permissions v Strapi admin"
echo "2. Přihlaste se do Strapi admin: $BACKEND_URL/admin"
echo "3. Jděte do Settings -> Users & Permissions -> Roles -> Public"
echo "4. Povolte potřebné endpointy (find, findOne, create)"
echo ""
echo -e "${YELLOW}Užitečné příkazy:${NC}"
echo "- Zobrazit Strapi logy: tail -f strapi.log"
echo "- Zobrazit databázi: sqlite3 penzion-backend/.tmp/data.db"
echo "- Restart služeb: pkill -f 'strapi develop' && ./start-all.sh"
