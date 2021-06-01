// 定义一个基本的异步网络请求方法
async function request(method, url) {
    let res = await fetch(url, {
        method
    });
    let json = await res.json();
    return json;
}
// 导出一个简单的GET请求方法
export function get(url) {
    return request('GET', url);
}
//# sourceMappingURL=request.js.map