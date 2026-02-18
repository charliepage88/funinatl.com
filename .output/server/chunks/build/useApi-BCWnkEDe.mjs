import { f as useRuntimeConfig } from './server.mjs';

function useApi() {
  const config = useRuntimeConfig();
  const base = config.public.apiBase;
  async function get(path, params) {
    const url = new URL(`${base}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    }
    const data = await $fetch(url.toString());
    return data;
  }
  async function post(path, body, token) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const data = await $fetch(`${base}${path}`, { method: "POST", body, headers });
    return data;
  }
  return { get, post };
}

export { useApi as u };
//# sourceMappingURL=useApi-BCWnkEDe.mjs.map
