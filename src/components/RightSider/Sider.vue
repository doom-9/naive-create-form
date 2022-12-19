<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import type { State } from '../../store'
import FormConfig from './components/FormConfig/FormConfig.vue'
import InputFormItemConfig from './components/FormItemConfig/InputFormItemConfig.vue'
import CheckBoxFormItemConfig from './components/FormItemConfig/CheckBoxFormItemConfig.vue'
import ColorPickerFormItemConfig from './components/FormItemConfig/ColorPickerFormItemConfig.vue'
import RadioFormItemConfig from './components/FormItemConfig/RadioFormItemConfig.vue'
import RateFormItemConfig from './components/FormItemConfig/RateFormItemConfig.vue'
import SelectFormItemConfig from './components/FormItemConfig/SelectFormItemConfig.vue'
import SliderFormItemConfig from './components/FormItemConfig/SliderFormItemConfig.vue'
import SwitchFormItemConfig from './components/FormItemConfig/SwitchFormItemConfig.vue'
import TimePickerFormItemConfig from './components/FormItemConfig/TimePickerFormItemConfig.vue'
import DatePickerFormItemConfig from './components/FormItemConfig/DatePickerFormItemConfig.vue'
import TreeSelectFormItemConfig from './components/FormItemConfig/TreeSelectFormItemConfig.vue'
import UploadFormItemConfig from './components/FormItemConfig/UploadFormItemConfig.vue'
import InputNumberFormItemConfig from './components/FormItemConfig/InputNumberFormItemConfig.vue'
import DividerConfig from './components/FormItemConfig/DividerConfig.vue'

const store = useStore<State>()
const selectedFormItemType = computed(() => {
  return store.state.selectedFormItemType
})
const selectedFormItem = computed(() => {
  return store.state.selectedFormItem
})
const formItemArrayLength = computed(() => {
  return store.getters.formItemArrayLength
})
const handleAddClick = () => {
  store.commit('addAndSelect', {
    value: '0',
  })
}
const showComponent = computed(() => {
  switch (selectedFormItemType.value) {
    case 'input':
      return InputFormItemConfig
    case 'inputNumber':
      return InputNumberFormItemConfig
    case 'radio':
      return RadioFormItemConfig
    case 'rate':
      return RateFormItemConfig
    case 'select':
      return SelectFormItemConfig
    case 'slider':
      return SliderFormItemConfig
    case 'switch':
      return SwitchFormItemConfig
    case 'timePicker':
      return TimePickerFormItemConfig
    case 'treeSelect':
      return TreeSelectFormItemConfig
    case 'upload':
      return UploadFormItemConfig
    case 'colorPicker':
      return ColorPickerFormItemConfig
    case 'checkbox':
      return CheckBoxFormItemConfig
    case 'datePicker':
      return DatePickerFormItemConfig
    case 'divider':
      return DividerConfig
    default:
      return ''
  }
})

const tabsValue = computed(() => {
  return store.state.tabsValue
})
const handleTabsChange = (val: 'form' | 'formItem') => {
  store.commit('changeTabsValue', val)
}
</script>

<template>
  <n-scrollbar>
    <n-divider title-placement="left">
      {{ $t("setUp") }}
    </n-divider>
    <n-tabs type="segment" :value="tabsValue" @update:value="handleTabsChange">
      <n-tab-pane name="formItem" :tab="$t('formItemConfiguration')">
        <n-empty
          v-if="formItemArrayLength === 0 || selectedFormItemType === ''"
          :description="$t('addFormItem')"
        >
          <template #extra>
            <n-button @click="handleAddClick">
              {{ $t("addFormItemAndSelect") }}
            </n-button>
          </template>
        </n-empty>
        <component :is="showComponent" v-else :key="selectedFormItem" />
      </n-tab-pane>
      <n-tab-pane name="form" :tab="$t('formConfiguration')">
        <FormConfig />
      </n-tab-pane>
    </n-tabs>
  </n-scrollbar>
</template>

<style></style>
