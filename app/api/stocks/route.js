import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'gainers';
  
  const baseUrl = 'https://www.nseindia.com';
  const apiEndpoint = `${baseUrl}/api/live-analysis-variations?index=${type}`;

  // 1. Define high-quality browser headers
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
  };

  try {
    // STEP 1: Get the session cookies by hitting the homepage first
    const sessionRes = await fetch(baseUrl, { headers });
    const setCookie = sessionRes.headers.get('set-cookie');

    if (!setCookie) {
      throw new Error('Failed to obtain session cookies');
    }

    // STEP 2: Use the cookies to fetch the actual data
    const response = await fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        ...headers,
        'Cookie': setCookie, // Crucial: Send the cookies back
        'Referer': baseUrl,
        'Accept': 'application/json, text/plain, */*',
      },
    });
    if (!response.ok) {
        throw new Error(`NSE API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Fetch failed:', error.message);
    
    // Return your fallback data here as you did before
    return NextResponse.json({ error: 'Blocked by NSE', usingFallback: true }, { status: 200 });
  }
}