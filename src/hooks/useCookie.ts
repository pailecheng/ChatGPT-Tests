import { useAuthStore } from '@/store'
export async function useCookie() {
  const isCookie = await useAuthStore.getSession()
  return isCookie
  }