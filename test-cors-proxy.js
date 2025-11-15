// Test CORS proxy functionality
// Run this in browser console on the NEW frontend URL

async function testCorsProxy() {
    console.log('🧪 Testing CORS Proxy Solution...');
    console.log('Current URL:', window.location.origin);
    
    const tests = [
        { name: 'Products API', endpoint: '/api/products/' },
        { name: 'Products Featured', endpoint: '/api/products/?sort_by=featured' },
        { name: 'Categories API', endpoint: '/api/categories/' },
        { name: 'Cart API', endpoint: '/api/cart/' }
    ];
    
    const results = [];
    
    for (const test of tests) {
        try {
            console.log(`Testing: ${test.name}...`);
            
            const response = await fetch(test.endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            results.push({
                test: test.name,
                endpoint: test.endpoint,
                status: response.status,
                success: true,
                data: data
            });
            
            console.log(`✅ ${test.name}: SUCCESS (${response.status})`);
            console.log('Response:', data);
            
        } catch (error) {
            results.push({
                test: test.name,
                endpoint: test.endpoint,
                success: false,
                error: error.message
            });
            
            console.log(`❌ ${test.name}: FAILED - ${error.message}`);
        }
    }
    
    // Summary
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    
    console.log('\n📊 CORS PROXY TEST SUMMARY:');
    console.log(`✅ Successful: ${successful}/${total}`);
    console.log(`❌ Failed: ${total - successful}/${total}`);
    
    if (successful === total) {
        console.log('\n🎉 ALL TESTS PASSED! CORS proxy is working perfectly!');
        console.log('Your frontend should now work without any CORS issues.');
    } else if (successful > 0) {
        console.log('\n⚠️ Partial success. Some endpoints working.');
    } else {
        console.log('\n❌ All tests failed. Check Railway backend status.');
    }
    
    return results;
}

// Auto-run the test
console.log('🚀 Starting CORS Proxy Test...');
testCorsProxy().then(results => {
    console.log('\n📋 Full Results:', results);
    window.corsProxyResults = results;
});

// Make function available globally
window.testCorsProxy = testCorsProxy;