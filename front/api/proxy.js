// Simple CORS proxy for Railway API
export default async function handler(req, res) {
  console.log('🚀 Proxy called:', req.method, req.url);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    console.log('✅ OPTIONS handled');
    return res.status(200).end();
  }
  
  try {
    const railwayUrl = 'https://web-production-0b12.up.railway.app';
    
    // Extract path from URL
    const urlPath = req.url.replace('/api/proxy', '');
    const targetUrl = `${railwayUrl}/api${urlPath}`;
    
    console.log('🎯 Target URL:', targetUrl);
    console.log('📦 Request body:', req.body);
    
    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
    
    // Add body for non-GET requests
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    
    console.log('🔄 Fetch options:', fetchOptions);
    
    // Make request to Railway
    const response = await fetch(targetUrl, fetchOptions);
    
    console.log('📡 Railway response:', response.status, response.statusText);
    
    // Get response data
    const data = await response.json();
    
    console.log('📄 Response data:', data);
    
    // Return response
    return res.status(response.status).json(data);
    
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return res.status(500).json({
      error: 'Proxy failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}