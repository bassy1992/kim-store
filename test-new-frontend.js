// Test script for new Vercel deployment
// Run this in browser console on front-gbhu180nn-bassys-projects-fca17413.vercel.app

const BACKEND_URL = 'https://kim-store-production.up.railway.app';

async function testNewFrontendConnection() {
    console.log('Testing connection from new Vercel deployment...');
    console.log('Frontend URL:', window.location.origin);
    console.log('Backend URL:', BACKEND_URL);
    
    try {
        // Test 1: Simple CORS test
        console.log('1. Testing simple CORS endpoint...');
        const corsResponse = await fetch(`${BACKEND_URL}/simple-cors-test/`);
        const corsData = await corsResponse.json();
        console.log('✅ Simple CORS test:', corsData);
        
        // Test 2: API status
        console.log('2. Testing API status...');
        const statusResponse = await fetch(`${BACKEND_URL}/api/status/`);
        const statusData = await statusResponse.json();
        console.log('✅ API status:', statusData);
        
        // Test 3: Products API with sort_by=featured
        console.log('3. Testing products API with sort_by=featured...');
        const productsResponse = await fetch(`${BACKEND_URL}/api/products/?sort_by=featured`);
        const productsData = await productsResponse.json();
        console.log('✅ Products API:', productsData);
        
        // Test 4: Categories API
        console.log('4. Testing categories API...');
        const categoriesResponse = await fetch(`${BACKEND_URL}/api/categories/`);
        const categoriesData = await categoriesResponse.json();
        console.log('✅ Categories API:', categoriesData);
        
        console.log('🎉 All tests passed! New frontend is connected to backend.');
        
        return {
            success: true,
            message: 'All API endpoints working correctly',
            frontend: window.location.origin,
            backend: BACKEND_URL
        };
        
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        console.log('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        return {
            success: false,
            error: error.message,
            frontend: window.location.origin,
            backend: BACKEND_URL
        };
    }
}

// Auto-run the test
testNewFrontendConnection().then(result => {
    console.log('Final result:', result);
});

// Also make it available globally
window.testConnection = testNewFrontendConnection;