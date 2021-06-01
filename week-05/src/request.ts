// 定义一个基本的异步网络请求方法
async function request<T>(method: string, url: string) {
    let res = await fetch(url, {
      method
    })
    let json: T = await res.json()
    return json
  }
  // 导出一个简单的GET请求方法
  export function get<T>(url: string) {
    return request<T>('GET', url)
  }