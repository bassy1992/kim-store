// Catch-all CORS proxy for Railway API
export default async function handler(req, res) {
  // Add comprehensive CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('✅ CORS Preflight handled');
    res.status(200).end();
    return;
  }
  
  try {
    const { path } = req.query;
    const railwayUrl = process.env.RAILWAY_URL || 'https://web-production-0b12.up.railway.app';
    
    // Construct the target URL
    const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
    
    // Get query string from original URL, excluding the path parameter
    const url = new URL(req.url, `https://${req.headers.host}`);
    const queryParams = new URLSearchParams(url.search);
    queryParams.delete('path'); // Remove the path parameter
    const queryString = queryParams.toString();
    
    const targetUrl = `${railwayUrl}/api/${targetPath}${queryString ? `?${queryString}` : ''}`;
    
    console.log('🔄 Proxying request:', {
      method: req.method,
      originalUrl: req.url,
      targetUrl,
      path: targetPath,
      query: queryString
    });
    
    // Prepare headers for Railway request
    const headers = {
      'User-Agent': 'Vercel-CORS-Proxy/2.0',
      'Accept': 'application/json'
    };
    
    // Only set Content-Type for requests with body
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      headers['Content-Type'] = 'application/json';
    }
    
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
    
    console.log('📡 Railway response:', {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type')
    });
    
    // Get response data
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        data = await response.text();
      }
    } else {
      data = await response.text();
    }
    
    // Return the response with CORS headers
    if (typeof data === 'string' && !contentType?.includes('application/json')) {
      res.status(response.status).send(data);
    } else {
      res.status(response.status).json(data);
    }
    
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({
      error: 'CORS Proxy failed',
      message: error.message,
      details: 'Railway backend may be unreachable',
      timestamp: new Date().toISOString(),
      railwayUrl: 'https://kim-store-production.up.railway.app'
    });
  }
}