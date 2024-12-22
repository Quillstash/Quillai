// utils/lemonSqueezyApiInstance.ts

import axios from 'axios';

// Replace with your Lemon Squeezy API key
const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;

if (!LEMON_SQUEEZY_API_KEY) {
  throw new Error('LEMON_SQUEEZY_API_KEY is not defined in your environment variables');
}

const lemonSqueezyApiInstance = axios.create({
  baseURL: 'https://api.lemonsqueezy.com/v1',
  headers: {
    'Authorization': `Bearer ${LEMON_SQUEEZY_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Example interceptor for logging requests and responses
lemonSqueezyApiInstance.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

lemonSqueezyApiInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default lemonSqueezyApiInstance;
