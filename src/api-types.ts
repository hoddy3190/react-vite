// Shared by the API handler (src/api.ts) and its consumers (RSC and Client Component).
// Kept free of server-only code so it can be imported from client components.
export const SERVER_INFO_PATH = '/api/server-info'

// Response shape of `GET /api/server-info`.
export type ServerInfo = {
  message: string
  // ISO 8601 time when the response was generated on the server
  time: string
  // random integer in [0, 100)
  random: number
}
