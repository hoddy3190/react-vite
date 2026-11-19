// Server Component: fetches `/api/server-info` on the server during RSC rendering.
// Server Components run on the server only, so the request must use an absolute URL.
import { SERVER_INFO_PATH, type ServerInfo } from './api-types.ts'

export async function ServerApiCard(props: { origin: string }) {
  const res = await fetch(new URL(SERVER_INFO_PATH, props.origin), {
    cache: 'no-store',
  })
  if (!res.ok) {
    return <p>Server API error: {res.status}</p>
  }
  const info = (await res.json()) as ServerInfo

  return (
    <div>
      <p>Server Component fetch</p>
      <ul>
        <li>message: {info.message}</li>
        <li>time: {info.time}</li>
        <li>random: {info.random}</li>
      </ul>
    </div>
  )
}
