// Emergency test script for Railway CORS fix
// Run this in browser console on your Vercel frontend

const BACKEND_URL = 'https://kim-store-production.up.railway.app';

async function testRailwayEmergency() {
    console.log('🚨 Testing Railway Emergency CORS Fix...');
    console.log('Frontend:', window.location.origin);
    console.log('Backend:', BACKEND_URL);
    
    const tests = [
        { name: 'Root endpoint', url: `${BACKEND_URL}/` },
        { name: 'Emergency CORS', url: `${BACKEND_URL}/emergency-cors/` },
        { name: 'Emergency view', url: `${BACKEND_URL}/emergency/` },
        { name: 'Simple CORS test', url: `${BACKEND_URL}/simple-cors-test/` },
        { name: 'Health check', url: `${BACKEND_URL}/health/` },
        { name: 'Products API', url: `${BACKEND_URL}/api/products/` },
        { name: 'Products featured', url: `${BACKEND_URL}/api/products/?sort_by=featured` }
    ];
    
    const results = [];
    
    for (const test of tests) {
        try {
            console.log(`Testing: ${test.name}...`);
            
            const response = await fetch(test.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': window.location.origin
                }
            });
            
            const data = await response.json();
            
            results.push({
                test: test.name,
                url: test.url,
                status: response.status,
                success: true,
                data: data,
                headers: Object.fromEntries(response.headers.entries())
            });
            
            console.log(`✅ ${test.name}: SUCCESS (${response.status})`);
            
        } catch (error) {
            results.push({
                test: test.name,
                url: test.url,
                success: false,
                error: error.message
            });
            
            console.log(`❌ ${test.name}: FAILED - ${error.message}`);
        }
    }
    
    // Summary
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    
    console.log('\n📊 TEST SUMMARY:');
    console.log(`✅ Successful: ${successful}/${total}`);
    console.log(`❌ Failed: ${total - successful}/${total}`);
    
    if (successful > 0) {
        console.log('\n🎉 CORS is working for some endpoints!');
        console.log('Working endpoints:');
        results.filter(r => r.success).forEach(r => {
            console.log(`  ✅ ${r.test}: ${r.url}`);
        });
    }
    
    if (successful < total) {
        console.log('\n⚠️ Some endpoints still failing:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`  ❌ ${r.test}: ${r.error}`);
        });
    }
    
    return results;
}

// Auto-run the test
console.log('🚀 Starting Railway Emergency CORS Test...');
testRailwayEmergency().then(results => {
    console.log('\n📋 Full Results:', results);
    
    // Store results globally for inspection
    window.railwayTestResults = results;
    
    // Check if main API is working
    const productsTest = results.find(r => r.test === 'Products featured');
    if (productsTest && productsTest.success) {
        console.log('\n🎯 MAIN API IS WORKING! Your frontend should now connect successfully.');
    } else {
        console.log('\n⏳ Main API not ready yet. Wait 2-3 minutes for Railway deployment and try again.');
    }
});

// Make function available globally
window.testRailwayEmergency = testRailwayEmergency;