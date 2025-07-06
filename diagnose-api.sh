#!/bin/bash

# Barvy
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}================================================${NC}"
echo -e "${CYAN}API Diagnostika - Pension Jesuitská${NC}"
echo -e "${CYAN}================================================${NC}"
echo ""

# 1. Kontrola struktur souborů
echo -e "${BLUE}1. Kontrola API struktur${NC}"
echo "--------------------------------"

# Kontrola Strapi API složek
echo -e "${YELLOW}Strapi API složky:${NC}"
if [ -d "penzion-backend/src/api" ]; then
    ls -la penzion-backend/src/api/ | grep "^d" | awk '{print "  - " $9}'
else
    echo -e "${RED}API složka nenalezena!${NC}"
fi

echo ""

# 2. Kontrola content-types
echo -e "${BLUE}2. Kontrola content-types${NC}"
echo "--------------------------------"

for api_dir in penzion-backend/src/api/*/; do
    if [ -d "$api_dir" ]; then
        api_name=$(basename "$api_dir")
        schema_file="$api_dir/content-types/$api_name/schema.json"
        
        if [ -f "$schema_file" ]; then
            echo -e "${GREEN}✓${NC} $api_name"
            # Zobraz základní info ze schématu
            plural=$(jq -r '.info.pluralName' "$schema_file" 2>/dev/null)
            echo "  - API endpoint: /api/$plural"
        else
            echo -e "${RED}✗${NC} $api_name - schema.json nenalezen"
        fi
    fi
done

echo ""

# 3. Kontrola routes
echo -e "${BLUE}3. Kontrola routes${NC}"
echo "--------------------------------"

for route_file in penzion-backend/src/api/*/routes/*.js; do
    if [ -f "$route_file" ]; then
        api_name=$(basename $(dirname $(dirname "$route_file")))
        route_name=$(basename "$route_file" .js)
        
        echo -e "${YELLOW}$api_name/$route_name:${NC}"
        
        # Kontrola, zda používá createCoreRouter
        if grep -q "createCoreRouter" "$route_file"; then
            echo -e "  ${GREEN}✓${NC} Používá createCoreRouter"
            
            # Kontrola auth nastavení
            if grep -q "auth: false" "$route_file"; then
                echo -e "  ${GREEN}✓${NC} Public access povolený"
            else
                echo -e "  ${YELLOW}!${NC} Možná vyžaduje autentizaci"
            fi
        fi
    fi
done

echo ""

# 4. Kontrola databáze
echo -e "${BLUE}4. Kontrola databáze${NC}"
echo "--------------------------------"

DB_FILE="penzion-backend/.tmp/data.db"

if [ -f "$DB_FILE" ]; then
    echo -e "${GREEN}✓${NC} Databáze existuje"
    
    # Počet tabulek
    table_count=$(sqlite3 "$DB_FILE" "SELECT COUNT(*) FROM sqlite_master WHERE type='table';" 2>/dev/null)
    echo "  - Počet tabulek: $table_count"
    
    # Kontrola permissions
    echo ""
    echo -e "${YELLOW}Public role permissions:${NC}"
    sqlite3 "$DB_FILE" "
        SELECT p.action, 'enabled' as status
        FROM up_permissions p 
        JOIN up_permissions_role_lnk prl ON p.id = prl.permission_id 
        JOIN up_roles r ON prl.role_id = r.id 
        WHERE r.type = 'public' AND p.action LIKE 'api::%'
        LIMIT 10;
    " 2>/dev/null | column -t -s "|" || echo "  Žádné API permissions nenalezeny"
else
    echo -e "${RED}✗${NC} Databáze neexistuje!"
fi

echo ""

# 5. Test live API
echo -e "${BLUE}5. Live API test${NC}"
echo "--------------------------------"

# Získání všech Strapi routes
echo -e "${YELLOW}Získávání seznamu routes...${NC}"
cd penzion-backend && npx strapi routes:list 2>/dev/null | grep "/api/" | grep -v "admin" | head -20
cd ..

echo ""

# 6. Kontrola middleware konfigurace
echo -e "${BLUE}6. Kontrola middleware${NC}"
echo "--------------------------------"

MIDDLEWARE_FILE="penzion-backend/config/middlewares.js"

if [ -f "$MIDDLEWARE_FILE" ]; then
    echo -e "${GREEN}✓${NC} Middleware konfigurace existuje"
    
    # Kontrola CORS
    if grep -q "cors" "$MIDDLEWARE_FILE"; then
        echo -e "${GREEN}✓${NC} CORS middleware nalezen"
        
        # Zobraz CORS nastavení
        echo -e "${YELLOW}CORS konfigurace:${NC}"
        grep -A5 -B5 "cors" "$MIDDLEWARE_FILE" | grep -E "(origin|cors)" | head -10
    fi
else
    echo -e "${RED}✗${NC} Middleware konfigurace nenalezena"
fi

echo ""

# 7. Frontend API konfigurace
echo -e "${BLUE}7. Frontend API konfigurace${NC}"
echo "--------------------------------"

# Kontrola .env souborů
for env_file in pension-jesuitska-new/.env* pension-dashboard/.env*; do
    if [ -f "$env_file" ]; then
        echo -e "${YELLOW}$env_file:${NC}"
        grep -E "(API|STRAPI|BACKEND)" "$env_file" 2>/dev/null | sed 's/^/  /'
    fi
done

echo ""

# 8. Doporučení
echo -e "${CYAN}================================================${NC}"
echo -e "${CYAN}Doporučení pro opravu${NC}"
echo -e "${CYAN}================================================${NC}"

echo -e "
${YELLOW}1. Ruční nastavení permissions:${NC}
   - Přihlaste se do Strapi admin: http://localhost:1337/admin
   - Settings -> Users & Permissions -> Roles -> Public
   - Zaškrtněte požadované endpointy

${YELLOW}2. Restart služeb:${NC}
   pkill -f 'strapi develop' && pkill -f 'next dev'
   ./start-all.sh

${YELLOW}3. Kontrola logů:${NC}
   tail -f penzion-backend/strapi.log

${YELLOW}4. Vyčištění cache:${NC}
   rm -rf penzion-backend/.cache
   rm -rf penzion-backend/build
   cd penzion-backend && pnpm build && pnpm develop
"
