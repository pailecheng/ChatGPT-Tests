<script lang="ts" setup>
import { computed, ref } from 'vue'
import { NButton, NInput,NSelect, useMessage } from 'naive-ui'
import { useUserStore } from '@/store'
import type { UserInfo } from '@/store/modules/user/helper'
import { t } from '@/locales'

const userStore = useUserStore()

const ms = useMessage()

const userInfo = computed(() => userStore.userInfo)

const avatar = ref(userInfo.value.avatar ?? '')

const selected =  { label: 'gpt-3.5-turbo', key: 'gpt-3.5', value: 'gpt-3.5-turbo' };

const options = [
  { label: 'gpt-3.5-turbo', key: 'gpt-3.5', value: 'gpt-3.5-turbo' },
  { label: 'gpt-4', key: 'gpt-4', value: 'gpt-4' },
]

function updateUserInfo(options: Partial<UserInfo>) {
  userStore.updateUserInfo(options)
  ms.success(t('common.success'))
}



</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">模型</span>
        <div class="flex flex-wrap items-center gap-4">
          <NSelect
            style="width: 140px"
            v-model="selected.value"
            :options="options"            
          />
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">秘钥</span>
        <div class="flex-1">
          <NInput v-model:value="avatar" placeholder="" />
        </div>
        <NButton size="tiny" text type="primary" @click="updateUserInfo({ avatar })">保存</NButton>
      </div>
    </div>
  </div>
</template>
