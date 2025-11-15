// CORS Proxy for Railway API
// This will proxy requests to Railway and add CORS headers

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    const { path, ...query } = req.query;
    const railwayUrl = 'https://kim-store-production.up.railway.app';
    
    // Construct the target URL
    const targetPath = Array.isArray(path) ? path.join('/') : (path || '');
    const queryString = new URLSearchParams(query).toString();
    const targetUrl = `${railwayUrl}/api/${targetPath}${queryString ? `?${queryString}` : ''}`;
    
    console.log('Proxying to:', targetUrl);
    
    // Forward the request to Railway
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.body && { body: JSON.stringify(req.body) })
      }
    });
    
    const data = await response.json();
    
    // Return the response with CORS headers
    res.status(response.status).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'Proxy failed',
      message: error.message,
      railway_status: 'unreachable'
    });
  }
}