// Test script to verify frontend-backend connection
// Run this in your browser console on front-pi-nine.vercel.app

const BACKEND_URL = 'https://your-railway-app.railway.app'; // Replace with your actual Railway URL

async function testBackendConnection() {
    console.log('Testing backend connection...');
    
    try {
        // Test 1: Health check
        console.log('1. Testing health endpoint...');
        const healthResponse = await fetch(`${BACKEND_URL}/health/`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData);
        
        // Test 2: API status
        console.log('2. Testing API status...');
        const statusResponse = await fetch(`${BACKEND_URL}/api/status/`);
        const statusData = await statusResponse.json();
        console.log('✅ API status:', statusData);
        
        // Test 3: Database stats
        console.log('3. Testing database stats...');
        const statsResponse = await fetch(`${BACKEND_URL}/api/stats/`);
        const statsData = await statsResponse.json();
        console.log('✅ Database stats:', statsData);
        
        // Test 4: Products API
        console.log('4. Testing products API...');
        const productsResponse = await fetch(`${BACKEND_URL}/api/products/`);
        const productsData = await productsResponse.json();
        console.log('✅ Products API:', productsData);
        
        console.log('🎉 All tests passed! Frontend-backend connection is working.');
        
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        console.log('Possible issues:');
        console.log('- CORS not properly configured');
        console.log('- Backend URL is incorrect');
        console.log('- Backend is not running');
        console.log('- Network connectivity issues');
    }
}

// Run the test
testBackendConnection();