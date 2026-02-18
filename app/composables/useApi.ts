export function useApi() {
  const config = useRuntimeConfig()
  const base = config.public.apiBase

  async function get<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
    const url = new URL(`${base}${path}`)
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))
    }
    const data = await $fetch<T>(url.toString())
    return data
  }

  async function post<T>(path: string, body: Record<string, unknown>, token?: string): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const data = await $fetch<T>(`${base}${path}`, { method: 'POST', body, headers })
    return data
  }

  return { get, post }
}
