<script lang="ts" setup>
import { ref } from 'vue';
import { NButton,NRadioGroup,NRadio, NInput } from 'naive-ui';
import { fetchChatSetting } from '@/api';
import {generateUniqueValue} from '@/utils/unique';
import Cookies from 'js-cookie'

interface SettingState {
  apiModel?: string
  apiKey?: string
}
const checkedValue = ref<string>('gpt-3.5');
function handleChange(value: string): void {
  checkedValue.value = value;
}

const setting = ref<SettingState>({});
Cookies.set('name', generateUniqueValue(16));
console.log(generateUniqueValue(16));
async function fetchSetting(): Promise<void> {
  try {
    const { data } = await fetchChatSetting(
      checkedValue.value,
      setting.value.apiKey ?? '' ,
    );
    console.log(Cookies.get('name'));
    console.log(data);
  } catch (error) {
    console.error(error);
  }

}
</script>
<template>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">模型</span>
        <div class="flex flex-wrap items-center gap-4">
          <n-space>
            <NRadioGroup  v-model:value="checkedValue">
              <n-space>
                <NRadio :checked="checkedValue === 'gpt-3.5'" @change="handleChange('gpt-3.5')" label="GPT-3.5-turbo" value="gpt-3.5" />
                <NRadio :checked="checkedValue === 'gpt-4'" @change="handleChange('gpt-4')" label="GPT-4" value="gpt-4" />
              </n-space>
            </NRadioGroup>
          </n-space>

        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">秘钥</span>
        <div class="flex-1">
          <NInput v-model:value="setting.apiKey" placeholder="" />
        </div>
        <NButton size="tiny" type="primary" @click="fetchSetting">保存</NButton>
      </div>
    </div>
  </div>
</template>