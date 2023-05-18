import { useAuthStoreWithout } from '@/store/modules/auth'
export async function useCookie() {
  const authStore = useAuthStoreWithout()
  const isCookie = await authStore.getSession()
  return isCookie
  }