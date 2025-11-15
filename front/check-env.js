// Quick script to check environment configuration
console.log('\n🔍 Environment Configuration Check\n');
console.log('Current .env file should have:');
console.log('VITE_API_URL=http://localhost:8000/api');
console.log('\n📝 To fix the CORS issue:');
console.log('1. Stop your frontend dev server (Ctrl+C)');
console.log('2. Verify .env file has: VITE_API_URL=http://localhost:8000/api');
console.log('3. Restart: pnpm dev');
console.log('4. The frontend will now connect to local backend\n');
