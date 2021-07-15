async function request<T>(method: string, url: string, data?: any) {
  let option: RequestInit = {
    method
  }
  if (data) {
    option.headers = {
      'Content-Type': 'application/json; charset=utf-8'
    }
    option.body = JSON.stringify(data)
  }
  let res = await fetch(url, option)
  let json: T = await res.json()
  return json
}

export function get<T>(url: string) {
  return request<T>('GET', url)
}

export function post<T>(url: string, data?: any) {
  return request<T>('POST', url, data)
}