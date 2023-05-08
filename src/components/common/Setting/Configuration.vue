<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NButton, NInput} from 'naive-ui';
import { useUserStore } from '@/store';

const userStore = useUserStore();


const userInfo = computed(() => userStore.userInfo);

const options = [
  { label: 'gpt-3.5-turbo', key: 'gpt-3.5', value: 'gpt-3.5-turbo' },
  { label: 'gpt-4', key: 'gpt-4', value: 'gpt-4' },
];

const avatar = ref(userInfo.value.avatar ?? '');

</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">模型</span>
        <div class="flex flex-wrap items-center gap-4">
          <label v-for="option in options" :key="option.value">
            <input type="radio" :value="option.value" v-model="$data.selectedOption">{{ option.label }}
          </label>
          <p>Selected option: {{ selectedOption }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">秘钥</span>
        <div class="flex-1">
          <NInput v-model:value="avatar" placeholder="" />
        </div>
        <NButton size="tiny" text type="primary">保存</NButton>
      </div>
    </div>
  </div>
</template>
