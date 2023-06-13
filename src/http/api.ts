import $http from './axios'

/**
 * 获取用户个人信息
 */
export const getUserInfo = (): Promise<{
  code: number
  data: any
  msg: string
}> => {
  return $http.$get('/api/user/info', '')
}
