const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://mohamedtahoon.runasp.net';

export const API_ENDPOINTS = {
  properties: `${API_BASE_URL}/Properties`,
  // Add other endpoints here
};

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

 