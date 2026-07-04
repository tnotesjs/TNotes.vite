# [0144. API 管理](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0144.%20API%20%E7%AE%A1%E7%90%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Axios 封装](#3-axios-封装)
- [4. Fetch 封装](#4-fetch-封装)
- [5. 请求拦截器](#5-请求拦截器)
- [6. 响应拦截器](#6-响应拦截器)
- [7. 错误处理](#7-错误处理)

<!-- endregion:toc -->

## 1. 本节内容

- 了解前端 API 管理的最佳实践
- 掌握 Axios 和 Fetch 的封装方式
- 理解请求拦截器、响应拦截器和错误处理

## 2. 评价

- 良好的 API 封装可以统一处理认证、错误、Loading 等通用逻辑
- 推荐使用 Axios（功能更完善）或ky（基于 Fetch 的轻量封装）

## 3. Axios 封装

- 创建 Axios 实例并统一配置：

```ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
```

## 4. Fetch 封装

- 基于原生 Fetch 的轻量封装：

```ts
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}
```

## 5. 请求拦截器

- 在请求发送前统一处理（如添加 Token）：

```ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

## 6. 响应拦截器

- 在响应返回后统一处理（如解析数据、处理错误码）：

```ts
api.interceptors.response.use(
  (response) => {
    const { code, data, message } = response.data
    if (code !== 200) {
      return Promise.reject(new Error(message))
    }
    return data
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期，跳转登录
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
```

## 7. 错误处理

- 统一的错误处理策略：
  - 网络错误：提示用户检查网络
  - 401：跳转登录页
  - 403：提示无权限
  - 500：提示服务器错误
  - 业务错误：显示后端返回的错误信息

```ts
function handleError(error: any) {
  if (!error.response) {
    message.error('网络错误，请检查网络连接')
    return
  }
  const { status } = error.response
  switch (status) {
    case 401:
      router.push('/login')
      break
    case 403:
      message.error('无权限访问')
      break
    case 500:
      message.error('服务器错误')
      break
    default:
      message.error(error.message)
  }
}
```
