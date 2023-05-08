<script lang="ts" setup>
import { ref } from 'vue';
import { FormRules, NButton,NRadioGroup,NRadio, NInput } from 'naive-ui';

const avatar = ref('abcdaesd');
const locale = ref('gpt-3.5')
const rules: FormRules = {
  input: [{ required: true, trigger: ['focus', 'input'], message: () => {
    return locale.value === 'gpt-3.5'
      ? '抽离透传归因分析作为抓手为产品赋能'
      : '方法论是组合拳达到平台化标准';
  } }]
};
const model = ref({
  input: ''
});
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
                <NRadio label="GPT-3.5-turbo" value="gpt-3.5" />
                <NRadio label="GPT-4" value="gpt-4" />
              </n-space>
            </NRadioGroup>
            <n-form :model="model" :rules="rules">
              <n-form-item label="输入点什么去掉 error" path="input">
                <NInput v-model="model.input" />
              </n-form-item>
            </n-form>
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