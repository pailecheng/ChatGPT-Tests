<script lang="ts" setup>
import { ref } from 'vue';
import { NButton, NInput,NSelect } from 'naive-ui';

const options = [
  { label: 'gpt-3.5-turbo', key: 'gpt-3.5', value: 'gpt-3.5-turbo' },
  { label: 'gpt-4', key: 'gpt-4', value: 'gpt-4' },
];
const selected = ref({ label: 'gpt-3.5-turbo', key: 'gpt-3.5', value: 'gpt-3.5-turbo' });

const avatar = ref('abcdaesd' ?? '');

</script>

<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">模型</span>
        <div class="flex flex-wrap items-center gap-4">
          <NSelect
            style="width: 140px"
            v-model="selected"
            :options="options"            
          />
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
