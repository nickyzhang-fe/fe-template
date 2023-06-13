import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios'

export const instance = axios.create({
  timeout: 15000,
  withCredentials: true,
  validateStatus() {
    return true
  },
})
/**
 * 前置拦截器（发起请求之前的拦截）
 */
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config && config.headers) {
    config.headers.set('X-WebOffice-Token', '1')
  }
  return config
})
/**
 * 后置拦截器（获取到响应时的拦截）
 */
instance.interceptors.response.use(
  (res: AxiosResponse): any => {
    if (res.status === 401) {
      // 未登录，展示登录页面
      throw Error('错误')
    } else if (res.status >= 200 && res.status < 300) {
      return res
    } else {
      // todo: 错误兜底
      console.error(res.status, res)
      throw res
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export function $get<T>(
  url: string,
  params: any = {},
  config?: InternalAxiosRequestConfig,
): Promise<T> {
  params && Object.assign(config?.params, params)
  return instance.get(url, config).then((res) => res.data as T)
}

function $post<T>(
  url: string,
  params: any = {},
  config: InternalAxiosRequestConfig,
): Promise<T> {
  return instance.post(url, params, config).then((res) => res.data as T)
}

function $patch<T>(
  url: string,
  params: any = {},
  config: InternalAxiosRequestConfig,
): Promise<T> {
  return instance.patch(url, params, config).then((res) => res.data as T)
}

function $delete<T>(
  url: string,
  params: any = {},
  config: InternalAxiosRequestConfig,
): Promise<T> {
  params && Object.assign(config, { data: params })
  return instance.delete(url, config).then((res) => res.data as T)
}

export default {
  $get,
  $post,
  $patch,
  $delete,
}
