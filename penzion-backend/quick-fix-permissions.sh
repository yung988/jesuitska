#!/bin/bash

# Quick Fix - Strapi Permissions
# This script immediately fixes the 404 API errors by setting permissions

echo "🚨 QUICK FIX: Setting up Strapi permissions..."

# Check if Strapi is running
if ! curl -s http://localhost:1337/admin > /dev/null 2>&1; then
    echo "❌ Strapi is not running! Please start Strapi first:"
    echo "   cd penzion-backend && npm run develop"
    exit 1
fi

echo "✅ Strapi is running"

# Try to get admin JWT token (assuming default admin exists)
echo "🔑 Attempting to get admin token..."

# Try common admin credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="AdminPassword123!"

# Login and get JWT token
JWT_RESPONSE=$(curl -s -X POST http://localhost:1337/admin/auth/local \
    -H "Content-Type: application/json" \
    -d "{
        \"identifier\": \"$ADMIN_EMAIL\",
        \"password\": \"$ADMIN_PASSWORD\"
    }")

JWT_TOKEN=$(echo $JWT_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$JWT_TOKEN" ]; then
    echo "❌ Could not get admin token. Please:"
    echo "1. Go to http://localhost:1337/admin"
    echo "2. Create admin account if needed"
    echo "3. Manually set permissions in Settings > Users & Permissions > Roles > Public"
    echo ""
    echo "Required permissions for PUBLIC role:"
    echo "- rooms: find, findOne"
    echo "- bookings: find, findOne, create"
    echo "- concierge-requests: find, findOne, create"
    echo "- concierge-services: find, findOne"
    echo "- employees: find, findOne"
    echo "- guests: find, findOne, create"
    echo "- lost-found-items: find, findOne"
    echo "- schedules: find, findOne"
    echo "- settings: find, findOne"
    echo "- stock-items: find, findOne"
    echo "- tasks: find, findOne"
    echo "- wine-cellars: find, findOne"
    echo "- wine-cellar-bookings: find, findOne, create"
    exit 1
fi

echo "✅ Got admin token"

# Get public role ID
echo "🔍 Getting public role ID..."
PUBLIC_ROLE_RESPONSE=$(curl -s -X GET http://localhost:1337/admin/users-permissions/roles \
    -H "Authorization: Bearer $JWT_TOKEN")

PUBLIC_ROLE_ID=$(echo $PUBLIC_ROLE_RESPONSE | grep -o '"id":[0-9]*,"name":"Public"' | grep -o '[0-9]*' | head -1)

if [ -z "$PUBLIC_ROLE_ID" ]; then
    echo "❌ Could not find public role ID"
    exit 1
fi

echo "✅ Public role ID: $PUBLIC_ROLE_ID"

# Set permissions for each content type
echo "🔧 Setting permissions..."

# Define content types and their permissions
declare -A PERMISSIONS=(
    ["room"]="find,findOne"
    ["booking"]="find,findOne,create"
    ["concierge-request"]="find,findOne,create"
    ["concierge-service"]="find,findOne"
    ["employee"]="find,findOne"
    ["guest"]="find,findOne,create"
    ["lost-found-item"]="find,findOne"
    ["schedule"]="find,findOne"
    ["setting"]="find,findOne"
    ["stock-item"]="find,findOne"
    ["task"]="find,findOne"
    ["wine-cellar"]="find,findOne"
    ["wine-cellar-booking"]="find,findOne,create"
)

for content_type in "${!PERMISSIONS[@]}"; do
    echo "Setting permissions for $content_type..."
    
    IFS=',' read -ra ACTIONS <<< "${PERMISSIONS[$content_type]}"
    
    for action in "${ACTIONS[@]}"; do
        # Use the users-permissions plugin API to set permissions
        curl -s -X PUT "http://localhost:1337/admin/users-permissions/roles/$PUBLIC_ROLE_ID" \
            -H "Authorization: Bearer $JWT_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{
                \"permissions\": {
                    \"api::$content_type.$content_type\": {
                        \"controllers\": {
                            \"$content_type\": {
                                \"$action\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                }
                            }
                        }
                    }
                }
            }" > /dev/null
    done
    
    echo "✅ Permissions set for $content_type"
done

echo ""
echo "🎉 Quick fix completed!"
echo ""
echo "📋 Next steps:"
echo "1. Test your API endpoints:"
echo "   curl http://localhost:1337/api/rooms"
echo "   curl http://localhost:1337/api/bookings"
echo "   curl http://localhost:1337/api/settings"
echo ""
echo "2. If still getting 404, restart Strapi:"
echo "   cd penzion-backend && npm run develop"
echo ""
echo "3. Check admin panel permissions:"
echo "   http://localhost:1337/admin"
echo "   Settings > Users & Permissions > Roles > Public"
echo ""
echo "4. If you need to run this again:"
echo "   bash quick-fix-permissions.sh"
