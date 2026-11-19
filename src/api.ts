import { SERVER_INFO_PATH, type ServerInfo } from './api-types.ts'

// Minimal API router. Returns `undefined` when the request is not an API request,
// so the caller can continue with RSC / SSR handling.
export function handleApi(request: Request): Response | undefined {
  const url = new URL(request.url)
  if (url.pathname !== SERVER_INFO_PATH) return undefined

  if (request.method !== 'GET') {
    return Response.json(
      { error: 'Method Not Allowed' },
      { status: 405, headers: { allow: 'GET' } },
    )
  }

  const body: ServerInfo = {
    message: 'Hello from the server API',
    time: new Date().toISOString(),
    random: Math.floor(Math.random() * 100),
  }
  return Response.json(body, {
    headers: { 'cache-control': 'no-store' },
  })
}
