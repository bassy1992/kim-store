// Test Railway backend directly
async function testRailwayDirect() {
    const railwayUrl = 'https://kim-store-production.up.railway.app';
    
    console.log('🧪 Testing Railway backend directly...');
    
    try {
        // Test API root
        console.log('Testing API root...');
        const apiResponse = await fetch(`${railwayUrl}/api/`);
        console.log('API Root Status:', apiResponse.status);
        
        // Test products endpoint
        console.log('Testing products endpoint...');
        const productsResponse = await fetch(`${railwayUrl}/api/products/`);
        console.log('Products Status:', productsResponse.status);
        
        if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            console.log('Products Data:', productsData);
        } else {
            const errorText = await productsResponse.text();
            console.log('Products Error:', errorText);
        }
        
        // Test cart endpoint
        console.log('Testing cart endpoint...');
        const cartResponse = await fetch(`${railwayUrl}/api/cart/`);
        console.log('Cart Status:', cartResponse.status);
        
        if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            console.log('Cart Data:', cartData);
        } else {
            const errorText = await cartResponse.text();
            console.log('Cart Error:', errorText);
        }
        
    } catch (error) {
        console.error('❌ Railway test failed:', error);
    }
}

// Run the test
testRailwayDirect();