// Direct test of Railway backend
// Run this in any browser console

async function testRailwayDirect() {
    const railwayUrl = 'https://kim-store-production.up.railway.app';
    
    console.log('🔍 Testing Railway backend directly...');
    
    const tests = [
        { name: 'Root', url: railwayUrl },
        { name: 'Health', url: `${railwayUrl}/health/` },
        { name: 'Emergency', url: `${railwayUrl}/emergency/` },
        { name: 'API Products', url: `${railwayUrl}/api/products/` }
    ];
    
    for (const test of tests) {
        try {
            console.log(`Testing ${test.name}...`);
            
            const response = await fetch(test.url, {
                method: 'GET',
                mode: 'no-cors' // Bypass CORS for testing
            });
            
            console.log(`✅ ${test.name}: Status ${response.status} (${response.type})`);
            
        } catch (error) {
            console.log(`❌ ${test.name}: ${error.message}`);
        }
    }
    
    // Test with curl-like approach
    console.log('\n🌐 Testing with fetch (will show CORS error but confirms server is up):');
    
    try {
        const response = await fetch(`${railwayUrl}/`);
        console.log('✅ Railway is responding!');
    } catch (error) {
        if (error.message.includes('CORS')) {
            console.log('✅ Railway is UP (CORS error means server responded)');
        } else {
            console.log('❌ Railway is DOWN:', error.message);
        }
    }
}

testRailwayDirect();