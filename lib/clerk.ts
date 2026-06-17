/**
 * Production Clerk keys (pk_live_*) only work on the configured domain (oreo.ink).
 * During local development, use pk_test_* keys OR this helper disables Clerk on localhost.
 */
export function isClerkEnabled(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!key) return false;

  // Test/development keys work on any origin including localhost
  if (key.startsWith("pk_test_")) return true;

  // Live keys: only enable in production builds (deployed to oreo.ink)
  if (key.startsWith("pk_live_")) {
    return process.env.NODE_ENV === "production";
  }

  return true;
}
