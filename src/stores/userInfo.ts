import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/http/api'
interface UserInfo {
  avatarUrl: string
  nickname: string
}

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref<UserInfo>({
    avatarUrl: '',
    nickname: '',
  })
  async function setUserInfo() {
    try {
      const res = await getUserInfo()
      const { code, data } = res
      if (code === 0) {
        console.log(data)
      }
    } catch (e) {
      console.log(e)
    }
  }
  return { userInfo, setUserInfo }
})
