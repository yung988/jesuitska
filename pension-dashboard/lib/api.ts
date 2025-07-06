import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if available
api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

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

/**
 * Fetch data from Strapi API
 */
export async function fetchAPI<T = any>(
  endpoint: string,
  options?: any
): Promise<T> {
  try {
    const response = await api.get(endpoint, options);
    return response.data;
  } catch (error) {
    console.error('Fetch API Error:', error);
    throw error;
  }
}

/**
 * Post data to Strapi API
 */
export async function postAPI<T = any>(
  endpoint: string,
  data: any,
  options?: any
): Promise<T> {
  try {
    const response = await api.post(endpoint, data, options);
    return response.data;
  } catch (error) {
    console.error('Post API Error:', error);
    throw error;
  }
}

/**
 * Update data in Strapi API
 */
export async function updateAPI<T = any>(
  endpoint: string,
  data: any,
  options?: any
): Promise<T> {
  try {
    const response = await api.put(endpoint, data, options);
    return response.data;
  } catch (error) {
    console.error('Update API Error:', error);
    throw error;
  }
}

/**
 * Delete data from Strapi API
 */
export async function deleteAPI<T = any>(
  endpoint: string,
  options?: any
): Promise<T> {
  try {
    const response = await api.delete(endpoint, options);
    return response.data;
  } catch (error) {
    console.error('Delete API Error:', error);
    throw error;
  }
}

export { API_URL, STRAPI_URL, api };
