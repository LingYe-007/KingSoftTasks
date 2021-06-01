async function request<T>(method: string, url: string) {
  let res = await fetch(url, {
    method
  })
  let json: T = await res.json()
  return json
}

export function get<T>(url: string) {
  return request<T>('GET', url)
}