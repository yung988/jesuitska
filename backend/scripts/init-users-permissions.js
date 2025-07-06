// Simple script to initialize users-permissions via HTTP API
const http = require('http');

const data = JSON.stringify({
  email: 'admin@example.com',
  password: 'admin123'
});

const options = {
  hostname: 'localhost',
  port: 1337,
  path: '/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🔧 Attempting to initialize users-permissions plugin...');
console.log('⚠️  This is a workaround for TypeScript config issues');
console.log('');

// Simple check if admin API is responding
const checkReq = http.request({
  hostname: 'localhost',
  port: 1337,
  path: '/admin/init',
  method: 'GET'
}, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(responseData);
      console.log('✅ Strapi admin is running');
      console.log('✅ Has admin user:', parsed.data.hasAdmin);
      console.log('');
      console.log('📋 Manual steps to fix the issue:');
      console.log('');
      console.log('1. Stop your current Strapi instance (Ctrl+C)');
      console.log('2. Clear any cache:');
      console.log('   rm -rf .cache');
      console.log('   rm -rf build');
      console.log('3. Restart Strapi:');
      console.log('   npm run develop');
      console.log('4. Wait for Strapi to fully load');
      console.log('5. Open admin panel: http://localhost:1337/admin');
      console.log('6. Go to Settings → Users & Permissions Plugin → Roles');
      console.log('');
      console.log('If content-types are still not visible:');
      console.log('7. Check browser console for errors (F12)');
      console.log('8. Try a different browser or incognito mode');
      console.log('9. Clear browser cache');
      console.log('');
      console.log('🚀 Alternative: Use the API directly');
      console.log('You can also set permissions programmatically once Strapi is running.');
      
    } catch (e) {
      console.error('❌ Could not parse response:', e.message);
    }
  });
});

checkReq.on('error', (err) => {
  console.error('❌ Error connecting to Strapi:', err.message);
  console.log('');
  console.log('Make sure Strapi is running on http://localhost:1337');
  console.log('Run: npm run develop');
});

checkReq.end();
