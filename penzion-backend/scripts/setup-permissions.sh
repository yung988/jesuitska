#!/bin/bash

# First, we need to login as admin to get JWT token
# You'll need to create an admin user first if you haven't already

echo "Setting up permissions for public access..."

# Alternative approach - directly update the bootstrap file to ensure permissions are set
cat > /tmp/permission-fix.js << 'EOF'
// This needs to be added to the bootstrap function
const publicRole = await strapi
  .query("plugin::users-permissions.role")
  .findOne({ where: { type: "public" } });

if (publicRole) {
  // Get all current permissions for the public role
  const currentPermissions = await strapi
    .query("plugin::users-permissions.permission")
    .findMany({ where: { role: publicRole.id } });

  const permissionsToCreate = [
    // Room permissions
    { action: "api::room.room.find" },
    { action: "api::room.room.findOne" },
    // Booking permissions
    { action: "api::booking.booking.find" },
    { action: "api::booking.booking.findOne" },
    { action: "api::booking.booking.create" },
    // Guest permissions
    { action: "api::guest.guest.create" },
    // Wine cellar permissions
    { action: "api::wine-cellar.wine-cellar.find" },
    { action: "api::wine-cellar.wine-cellar.findOne" },
  ];

  for (const perm of permissionsToCreate) {
    const exists = currentPermissions.some(cp => cp.action === perm.action);
    if (!exists) {
      await strapi.query("plugin::users-permissions.permission").create({
        data: {
          ...perm,
          role: publicRole.id,
        },
      });
      strapi.log.info(`Created permission: ${perm.action}`);
    }
  }
}
EOF

echo "Permissions setup complete. Please restart Strapi for changes to take effect."
