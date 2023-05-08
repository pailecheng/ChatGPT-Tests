<script lang="ts" setup>
import { ref } from 'vue';
import { FormRules, NForm,NItem,NSpace,NButton,NGroup,NRadio, NInput, NSelect } from 'naive-ui';

const options = [
  { label: 'gpt-3.5-turbo', key: 'gpt-3.5', value: 'gpt-3.5-turbo' },
  { label: 'gpt-4', key: 'gpt-4', value: 'gpt-4' },
];
const selected = ref('gpt-3.5-turbo');

const avatar = ref('abcdaesd');
const locale = ref('语言1')
const rules: FormRules = {
  input: [{ required: true, trigger: ['focus', 'input'], message: () => {
    return locale.value === '语言1'
      ? '抽离透传归因分析作为抓手为产品赋能'
      : '方法论是组合拳达到平台化标准';
  } }]
};
const model = ref({
  input: ''
});
</script>
<template>
  <NSpace>
          <NGroup v-model:value="locale">
            <NSpace>
              <NRadio label="语言1" value="语言1" />
              <NRadio label="语言2" value="语言2" />
            </NSpace>
          </NGroup>
          <NForm :model="model" :rules="rules">
            <NItem label="输入点什么去掉 error" path="input">
              <NInput v-model="model.input" />
            </NItem>
          </NForm>
        </NSpace>
  <div class="p-4 space-y-5 min-h-[200px]">
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        
      </div>
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
          <NInput v-model="avatar" placeholder="" />
        </div>
        <NButton size="tiny" type="primary">保存</NButton>
      </div>
    </div>
  </div>
</template>