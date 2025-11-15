// Quick test for your Railway backend
async function testRailwayQuick() {
    const railwayUrl = 'https://web-production-0b12.up.railway.app';
    
    console.log('🧪 Testing Railway backend...');
    console.log(`URL: ${railwayUrl}`);
    
    try {
        // Test API root
        console.log('\n1. Testing API root...');
        const apiResponse = await fetch(`${railwayUrl}/api/`);
        console.log(`Status: ${apiResponse.status}`);
        
        if (apiResponse.ok) {
            const apiData = await apiResponse.json();
            console.log('✅ API is working!');
            console.log('Response:', apiData);
            
            // Test products
            console.log('\n2. Testing products...');
            const productsResponse = await fetch(`${railwayUrl}/api/products/`);
            console.log(`Products status: ${productsResponse.status}`);
            
            if (productsResponse.ok) {
                const productsData = await productsResponse.json();
                console.log('✅ Products working!');
                console.log(`Found ${productsData.results?.length || 0} products`);
                
                console.log('\n🎉 SUCCESS! Your backend is working!');
                console.log('\n📋 Next steps:');
                console.log('1. Update Vercel VITE_API_URL to: https://web-production-0b12.up.railway.app/api');
                console.log('2. Redeploy frontend');
                console.log('3. Test your website - no more 404 errors!');
                
            } else {
                console.log('❌ Products endpoint failed');
                const errorText = await productsResponse.text();
                console.log('Error:', errorText);
            }
            
        } else {
            console.log('❌ API not responding');
            const errorText = await apiResponse.text();
            console.log('Error:', errorText);
        }
        
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Check Railway environment variables are set');
        console.log('2. Verify PostgreSQL is connected');
        console.log('3. Check Railway logs for errors');
        console.log('4. Wait a few minutes for deployment to complete');
    }
}

// Run the test
testRailwayQuick();