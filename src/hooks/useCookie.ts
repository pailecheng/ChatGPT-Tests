import { useAuthStoreWithout } from '@/store/modules/auth'
export function useCookie() {
  const authStore = useAuthStoreWithout()
  const isCookie =  authStore.getSession()
  return isCookie
  }