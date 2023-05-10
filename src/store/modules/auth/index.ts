import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from './helper'
import { store } from '@/store'
import { fetchSession } from '@/api'
import {generateUniqueValue} from '@/utils/unique'
import * as Cookies from 'tiny-cookie'

interface SessionResponse {
  auth: boolean
  model: 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI'
}

export interface AuthState {
  token: string | undefined
  session: SessionResponse | null
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    session: null,
  }),

  getters: {
    isChatGPTAPI(state): boolean {
      return state.session?.model === 'ChatGPTAPI'
    },
  },

  actions: {
    async getSession() {
      try {
        //设置cookie
        const cookie = Cookies.get('cookieName');
        let data = undefined;
        if (cookie === '') {
          Cookies.set('cookieName', generateUniqueValue(16));
        } else {
          data = await fetchSession<SessionResponse>(cookie);
        }
        this.session = { ...(data || {}) };
        return Promise.resolve(data);
        
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
