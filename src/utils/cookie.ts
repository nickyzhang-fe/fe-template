/**
 * 获取cookie值
 * @param cookie
 * @returns object
 */
export const parseCookie = function (cookie: string): any {
  const cookieObj: any = {}
  const cArr = cookie.split(';')
  for (const str of cArr) {
    const string = str.trim()
    const key = string.split('=')[0]
    const value = string.substring(key.length + 1)
    cookieObj[key] = value
  }
  return cookieObj
}
/**
 * 获取cookie值
 * @param cookie
 * @returns string
 */
export const getCookie = (name: string): string => {
  const cookies = document.cookie
  const list = cookies.split('; ')

  for (let i = 0; i < list.length; i++) {
    const arr = list[i].split('=') // 解析出名和值
    if (arr[0] == name) return decodeURIComponent(arr[1]) // 对cookie值解码
  }
  return ''
}

/**
 * 设置cookie值
 * @param name
 * @param value
 * @param days
 */
export const setCookie = function (
  name: string,
  value: any,
  days: number,
): any {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

/**
 * 设置域名下的cookie
 * @param name
 * @param value
 * @param domain
 * @param path
 * @param expires
 */
export const setDomainCookie = function (
  name: string,
  value: string,
  domain: string,
  path: string = '/',
  expires: number,
): any {
  let newDate = new Date()
  if (expires) {
    newDate = new Date(Date.now() + expires)
  }
  const tempcookie =
    name +
    '=' +
    escape(value) +
    (expires ? '; expires=' + newDate.toUTCString() : '') +
    (path ? '; path=' + path : '') +
    (domain ? '; domain=' + domain : '')
  if (tempcookie.length < 4096) {
    document.cookie = tempcookie
  }
}
