'use client'

import React from 'react'
import { SERVER_INFO_PATH, type ServerInfo } from './api-types.ts'

// Client Component: fetches `/api/server-info` from the browser after mount.
export function ClientApiCard() {
  const [info, setInfo] = React.useState<ServerInfo | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const controller = new AbortController()
    fetch(SERVER_INFO_PATH, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        setInfo((await res.json()) as ServerInfo)
      })
      .catch((e: unknown) => {
        if (controller.signal.aborted) return
        setError(e instanceof Error ? e.message : String(e))
      })
    return () => controller.abort()
  }, [])

  if (error) return <p>Client API error: {error}</p>
  if (!info) return <p>Client API loading...</p>

  return (
    <div>
      <p>Client Component fetch</p>
      <ul>
        <li>message: {info.message}</li>
        <li>time: {info.time}</li>
        <li>random: {info.random}</li>
      </ul>
    </div>
  )
}
