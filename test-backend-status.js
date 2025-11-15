// Test if your backend is working
async function testBackendStatus() {
    console.log('🧪 Testing backend status...');
    
    // Test different possible URLs
    const urls = [
        'https://web-production-0b12.up.railway.app/api/',
        'https://kim-store-production.up.railway.app/api/',
        'http://localhost:8000/api/',
    ];
    
    for (const url of urls) {
        try {
            console.log(`\n🔍 Testing: ${url}`);
            const response = await fetch(url);
            console.log(`Status: ${response.status}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Backend is working!');
                console.log('Response:', data);
                
                // Test products endpoint
                const productsUrl = url + 'products/';
                console.log(`\n🛍️ Testing products: ${productsUrl}`);
                const productsResponse = await fetch(productsUrl);
                console.log(`Products status: ${productsResponse.status}`);
                
                if (productsResponse.ok) {
                    const productsData = await productsResponse.json();
                    console.log('✅ Products endpoint working!');
                    console.log(`Found ${productsData.results?.length || 0} products`);
                }
                
                return url; // Return working URL
            } else {
                console.log('❌ Backend not responding correctly');
            }
        } catch (error) {
            console.log('❌ Connection failed:', error.message);
        }
    }
    
    console.log('\n🚨 No working backend found. Please deploy to Railway first.');
    return null;
}

// Run the test
testBackendStatus().then(workingUrl => {
    if (workingUrl) {
        console.log(`\n✅ Use this URL in Vercel VITE_API_URL: ${workingUrl}`);
    } else {
        console.log('\n📋 Next steps:');
        console.log('1. Deploy backend to Railway');
        console.log('2. Update VITE_API_URL in Vercel');
        console.log('3. Redeploy frontend');
    }
});