// Catch-all CORS proxy for Railway API
export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    const { path } = req.query;
    const railwayUrl = 'https://kim-store-production.up.railway.app';
    
    // Construct the target URL
    const targetPath = Array.isArray(path) ? path.join('/') : '';
    const queryString = req.url.split('?')[1] || '';
    const targetUrl = `${railwayUrl}/${targetPath}${queryString ? `?${queryString}` : ''}`;
    
    console.log('Proxying request:', {
      method: req.method,
      targetUrl,
      headers: req.headers
    });
    
    // Prepare headers for Railway request
    const headers = {
      'Content-Type': 'application/json',
      'User-Agent': 'Vercel-CORS-Proxy/1.0'
    };
    
    // Add authorization if present
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }
    
    // Forward the request to Railway
    const fetchOptions = {
      method: req.method,
      headers
    };
    
    // Add body for POST/PUT requests
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    
    const response = await fetch(targetUrl, fetchOptions);
    
    // Get response data
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Return the response with CORS headers
    res.status(response.status).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'CORS Proxy failed',
      message: error.message,
      details: 'Railway backend may be unreachable',
      timestamp: new Date().toISOString()
    });
  }
}