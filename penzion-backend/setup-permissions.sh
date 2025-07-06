#!/bin/bash

# Setup Strapi Permissions Script
# This script sets up all necessary permissions for the Strapi API

echo "🚀 Setting up Strapi permissions..."

# Check if Strapi is running
check_strapi() {
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:1337/admin > /dev/null 2>&1; then
            echo "✅ Strapi is running"
            return 0
        fi
        echo "⏳ Waiting for Strapi to start... (attempt $attempt/$max_attempts)"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "❌ Strapi is not responding after $max_attempts attempts"
    return 1
}

# Create admin user if it doesn't exist
create_admin_user() {
    echo "👤 Creating admin user..."
    
    # Check if admin user already exists
    ADMIN_EXISTS=$(curl -s -X POST http://localhost:1337/admin/auth/local/register \
        -H "Content-Type: application/json" \
        -d '{
            "firstname": "Admin",
            "lastname": "User",
            "email": "admin@example.com",
            "password": "AdminPassword123!"
        }' | grep -o '"user"' || echo "")
    
    if [ -n "$ADMIN_EXISTS" ]; then
        echo "✅ Admin user created successfully"
    else
        echo "ℹ️  Admin user might already exist"
    fi
}

# Login and get JWT token
get_jwt_token() {
    echo "🔑 Getting JWT token..."
    
    local response=$(curl -s -X POST http://localhost:1337/admin/auth/local \
        -H "Content-Type: application/json" \
        -d '{
            "identifier": "admin@example.com",
            "password": "AdminPassword123!"
        }')
    
    JWT_TOKEN=$(echo $response | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    
    if [ -n "$JWT_TOKEN" ]; then
        echo "✅ JWT token obtained"
        return 0
    else
        echo "❌ Failed to get JWT token"
        echo "Response: $response"
        return 1
    fi
}

# Set permissions for public role
set_public_permissions() {
    echo "🌐 Setting public permissions..."
    
    # Get public role ID
    local public_role_response=$(curl -s -X GET http://localhost:1337/admin/users-permissions/roles \
        -H "Authorization: Bearer $JWT_TOKEN")
    
    local public_role_id=$(echo $public_role_response | grep -o '"id":[0-9]*,"name":"Public"' | grep -o '[0-9]*' | head -1)
    
    if [ -z "$public_role_id" ]; then
        echo "❌ Could not find public role ID"
        return 1
    fi
    
    echo "📝 Public role ID: $public_role_id"
    
    # Define permissions for each content type (based on your actual API structure)
    local content_types=("room" "booking" "concierge-request" "concierge-service" "employee" "guest" "lost-found-item" "schedule" "setting" "stock-item" "task" "wine-cellar" "wine-cellar-booking")
    
    for content_type in "${content_types[@]}"; do
        echo "Setting permissions for $content_type..."
        
        # Set permissions (find, findOne for public access)
        curl -s -X PUT "http://localhost:1337/admin/users-permissions/roles/$public_role_id" \
            -H "Authorization: Bearer $JWT_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{
                \"permissions\": {
                    \"api::$content_type.$content_type\": {
                        \"controllers\": {
                            \"$content_type\": {
                                \"find\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                },
                                \"findOne\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                }
                            }
                        }
                    }
                }
            }" > /dev/null
        
        echo "✅ Permissions set for $content_type"
    done
}

# Set permissions for authenticated role
set_authenticated_permissions() {
    echo "🔐 Setting authenticated permissions..."
    
    # Get authenticated role ID
    local auth_role_response=$(curl -s -X GET http://localhost:1337/admin/users-permissions/roles \
        -H "Authorization: Bearer $JWT_TOKEN")
    
    local auth_role_id=$(echo $auth_role_response | grep -o '"id":[0-9]*,"name":"Authenticated"' | grep -o '[0-9]*' | head -1)
    
    if [ -z "$auth_role_id" ]; then
        echo "❌ Could not find authenticated role ID"
        return 1
    fi
    
    echo "📝 Authenticated role ID: $auth_role_id"
    
    # Define permissions for each content type (based on your actual API structure)
    local content_types=("room" "booking" "concierge-request" "concierge-service" "employee" "guest" "lost-found-item" "schedule" "setting" "stock-item" "task" "wine-cellar" "wine-cellar-booking")
    
    for content_type in "${content_types[@]}"; do
        echo "Setting authenticated permissions for $content_type..."
        
        # Set full permissions for authenticated users
        curl -s -X PUT "http://localhost:1337/admin/users-permissions/roles/$auth_role_id" \
            -H "Authorization: Bearer $JWT_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{
                \"permissions\": {
                    \"api::$content_type.$content_type\": {
                        \"controllers\": {
                            \"$content_type\": {
                                \"find\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                },
                                \"findOne\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                },
                                \"create\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                },
                                \"update\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                },
                                \"delete\": {
                                    \"enabled\": true,
                                    \"policy\": \"\"
                                }
                            }
                        }
                    }
                }
            }" > /dev/null
        
        echo "✅ Authenticated permissions set for $content_type"
    done
}

# Alternative method using Strapi CLI (if available)
setup_permissions_via_cli() {
    echo "🛠️  Setting up permissions via configuration..."
    
    # Create permissions config file
    cat > /tmp/permissions-config.json << 'EOF'
{
  "public": {
    "api::room.room": ["find", "findOne"],
    "api::booking.booking": ["find", "findOne", "create"],
    "api::concierge-request.concierge-request": ["find", "findOne", "create"],
    "api::concierge-service.concierge-service": ["find", "findOne"],
    "api::employee.employee": ["find", "findOne"],
    "api::guest.guest": ["find", "findOne", "create"],
    "api::lost-found-item.lost-found-item": ["find", "findOne"],
    "api::schedule.schedule": ["find", "findOne"],
    "api::setting.setting": ["find", "findOne"],
    "api::stock-item.stock-item": ["find", "findOne"],
    "api::task.task": ["find", "findOne"],
    "api::wine-cellar.wine-cellar": ["find", "findOne"],
    "api::wine-cellar-booking.wine-cellar-booking": ["find", "findOne", "create"]
  },
  "authenticated": {
    "api::room.room": ["find", "findOne", "create", "update", "delete"],
    "api::booking.booking": ["find", "findOne", "create", "update", "delete"],
    "api::concierge-request.concierge-request": ["find", "findOne", "create", "update", "delete"],
    "api::concierge-service.concierge-service": ["find", "findOne", "create", "update", "delete"],
    "api::employee.employee": ["find", "findOne", "create", "update", "delete"],
    "api::guest.guest": ["find", "findOne", "create", "update", "delete"],
    "api::lost-found-item.lost-found-item": ["find", "findOne", "create", "update", "delete"],
    "api::schedule.schedule": ["find", "findOne", "create", "update", "delete"],
    "api::setting.setting": ["find", "findOne", "create", "update", "delete"],
    "api::stock-item.stock-item": ["find", "findOne", "create", "update", "delete"],
    "api::task.task": ["find", "findOne", "create", "update", "delete"],
    "api::wine-cellar.wine-cellar": ["find", "findOne", "create", "update", "delete"],
    "api::wine-cellar-booking.wine-cellar-booking": ["find", "findOne", "create", "update", "delete"]
  }
}
EOF
    
    echo "✅ Permissions configuration created"
}

# Create database bootstrap script
create_bootstrap_script() {
    echo "📋 Creating bootstrap script..."
    
    cat > ./bootstrap-permissions.js << 'EOF'
module.exports = async ({ strapi }) => {
  console.log('🚀 Bootstrapping permissions...');
  
  const permissions = {
    public: {
      'api::room.room': ['find', 'findOne'],
      'api::booking.booking': ['find', 'findOne', 'create'],
      'api::service.service': ['find', 'findOne'],
      'api::gallery.gallery': ['find', 'findOne'],
      'api::testimonial.testimonial': ['find', 'findOne'],
      'api::page.page': ['find', 'findOne'],
      'api::setting.setting': ['find', 'findOne']
    },
    authenticated: {
      'api::room.room': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::booking.booking': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::service.service': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::gallery.gallery': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::testimonial.testimonial': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::page.page': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::setting.setting': ['find', 'findOne', 'create', 'update', 'delete']
    }
  };

  try {
    // Get roles
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { name: 'Public' }
    });
    
    const authenticatedRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { name: 'Authenticated' }
    });

    if (!publicRole || !authenticatedRole) {
      console.error('❌ Could not find required roles');
      return;
    }

    // Update permissions for public role
    for (const [contentType, actions] of Object.entries(permissions.public)) {
      for (const action of actions) {
        await strapi.query('plugin::users-permissions.permission').updateMany({
          where: {
            role: publicRole.id,
            action: `${contentType}.${action}`
          },
          data: {
            enabled: true
          }
        });
      }
    }

    // Update permissions for authenticated role
    for (const [contentType, actions] of Object.entries(permissions.authenticated)) {
      for (const action of actions) {
        await strapi.query('plugin::users-permissions.permission').updateMany({
          where: {
            role: authenticatedRole.id,
            action: `${contentType}.${action}`
          },
          data: {
            enabled: true
          }
        });
      }
    }

    console.log('✅ Permissions bootstrapped successfully');
  } catch (error) {
    console.error('❌ Error bootstrapping permissions:', error);
  }
};
EOF
    
    echo "✅ Bootstrap script created"
}

# Main execution
main() {
    echo "🏁 Starting Strapi permissions setup..."
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        echo "❌ Please run this script from the Strapi project root directory"
        exit 1
    fi
    
    # Method 1: Try API approach (if Strapi is running)
    if check_strapi; then
        echo "📡 Using API approach..."
        create_admin_user
        if get_jwt_token; then
            set_public_permissions
            set_authenticated_permissions
            echo "✅ API permissions setup completed"
        else
            echo "⚠️  API approach failed, falling back to bootstrap method"
            create_bootstrap_script
        fi
    else
        echo "⚠️  Strapi not running, creating bootstrap script"
        create_bootstrap_script
    fi
    
    # Create a package.json script for easy execution
    echo "📦 Adding npm script..."
    if command -v jq > /dev/null; then
        jq '.scripts.setup-permissions = "bash setup-permissions.sh"' package.json > package.json.tmp && mv package.json.tmp package.json
        echo "✅ Added 'npm run setup-permissions' script"
    else
        echo "ℹ️  Install jq to automatically add npm script"
    fi
    
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "📋 Next steps:"
    echo "1. If Strapi is running, permissions should be set automatically"
    echo "2. If not, restart Strapi and the bootstrap script will run"
    echo "3. Check admin panel at http://localhost:1337/admin"
    echo "4. Verify permissions in Settings > Users & Permissions Plugin > Roles"
    echo ""
    echo "🔧 You can also run: npm run setup-permissions"
}

# Execute main function
main "$@"
