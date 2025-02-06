import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { auth as authMiddleware } from '@/auth'; // Import your existing auth middleware

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Rate limiting configuration
const RATE_LIMIT = {
  windowSize: 60, // Time window in seconds
  maxRequests: 10, // Maximum number of requests allowed in the time window
};

// Rate limiting middleware
async function rateLimitMiddleware(req) {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown-ip';

  try {
    // Create a unique key for the IP address
    const key = `rate-limit:${ip}`;

    // Get the current request count
    const currentCount = await redis.incr(key);

    // If this is the first request, set an expiration time for the key
    if (currentCount === 1) {
      await redis.expire(key, RATE_LIMIT.windowSize);
    }

    // Check if the request count exceeds the limit
    if (currentCount > RATE_LIMIT.maxRequests) {
      return new NextResponse(
        JSON.stringify({ message: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Rate limiting error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Combined middleware
export async function middleware(req) {
  const path = req.nextUrl.pathname;

  // Skip rate limiting for NextAuth.js routes
  if (path.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Apply rate limiting to all other routes
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse) {
    return rateLimitResponse; // Return rate limit response if the limit is exceeded
  }

  // Apply auth middleware
  const authResponse = await authMiddleware(req);
  if (authResponse) {
    return authResponse; // Return auth response if authentication fails
  }

  // If both middlewares pass, allow the request to proceed
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: '/api/:path*', // Apply to all API routes
};