<script lang="ts" setup>
import { ref } from 'vue';
import { NButton,NRadioGroup,NRadio, NInput } from 'naive-ui';

const avatar = ref('abcdaesd');
const locale = ref('gpt-3.5')
const checkedValue = ref<string | null>(null)
function handleChange(e: Event): void {
  checkedValue.value = (e.target as HTMLInputElement).value;
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
            <NRadioGroup v-model:value="locale">
              <n-space>
                <NRadio :checked="checkedValue === 'gpt-3.5'" @change="handleChange" label="GPT-3.5-turbo" value="gpt-3.5" />
                <NRadio :checked="checkedValue === 'gpt-4'" @change="handleChange" label="GPT-4" value="gpt-4" />
              </n-space>
            </NRadioGroup>
          </n-space>

        </div>
      </div>
      <div class="flex items-center space-x-4">
        <span class="flex-shrink-0 w-[100px]">秘钥</span>
        <div class="flex-1">
          <NInput v-model="avatar" placeholder="" />
        </div>
        <NButton size="tiny" type="primary">保存</NButton>
      </div>
    </div>
  </div>
</template>