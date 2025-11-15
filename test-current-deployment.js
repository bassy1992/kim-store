// Test current Vercel deployment
// Run this in browser console

async function testCurrentDeployment() {
    const frontendUrl = 'https://front-5hqcrmsuw-bassys-projects-fca17413.vercel.app';
    
    console.log('🧪 Testing Current Deployment...');
    console.log('Frontend URL:', frontendUrl);
    
    const tests = [
        { name: 'Frontend Root', url: frontendUrl },
        { name: 'API Proxy - Products', url: `${frontendUrl}/api/products/` },
        { name: 'API Proxy - Categories', url: `${frontendUrl}/api/categories/` },
        { name: 'API Proxy - Cart', url: `${frontendUrl}/api/cart/` }
    ];
    
    const results = [];
    
    for (const test of tests) {
        try {
            console.log(`Testing: ${test.name}...`);
            
            const response = await fetch(test.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            let data;
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }
            
            results.push({
                test: test.name,
                url: test.url,
                status: response.status,
                success: response.ok,
                data: data
            });
            
            console.log(`${response.ok ? '✅' : '❌'} ${test.name}: ${response.status}`);
            if (response.ok && typeof data === 'object') {
                console.log('Response:', data);
            }
            
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
    
    console.log('\n📊 DEPLOYMENT TEST SUMMARY:');
    console.log(`✅ Successful: ${successful}/${total}`);
    console.log(`❌ Failed: ${total - successful}/${total}`);
    
    const apiTests = results.filter(r => r.test.includes('API'));
    const apiSuccessful = apiTests.filter(r => r.success).length;
    
    if (apiSuccessful > 0) {
        console.log('\n🎉 CORS PROXY IS WORKING!');
        console.log('Your frontend should work without CORS issues.');
    } else {
        console.log('\n⚠️ CORS proxy may not be working. Check API functions.');
    }
    
    return results;
}

// Auto-run the test
console.log('🚀 Testing Current Deployment...');
testCurrentDeployment().then(results => {
    console.log('\n📋 Full Results:', results);
    window.deploymentTestResults = results;
});

// Make function available globally
window.testCurrentDeployment = testCurrentDeployment;