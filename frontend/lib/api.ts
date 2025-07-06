const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface FetchOptions extends RequestInit {
  token?: string;
}

/**
 * Base fetch function for API calls
 */
export async function fetchAPI(
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token is provided
  if (token || process.env.NEXT_PUBLIC_API_TOKEN) {
    headers['Authorization'] = `Bearer ${token || process.env.NEXT_PUBLIC_API_TOKEN}`;
  }

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Get media URL from Strapi
 */
export function getStrapiMediaURL(url: string | null): string | null {
  if (!url) return null;
  
  // Return as is if it's already a full URL
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}

export { API_URL, STRAPI_URL };
