export function extractAgentKey(req: Request): string | null {
  const authHeader = req.headers.get("authorization");
  const apiKeyHeader = req.headers.get("x-api-key");

  if (apiKeyHeader) return apiKeyHeader;
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  return null;
}

export function isAgentAuthorized(req: Request): boolean {
  const expected = process.env.AGENT_API_KEY;
  if (!expected) return false;
  const actual = extractAgentKey(req);
  return !!actual && actual === expected;
}
