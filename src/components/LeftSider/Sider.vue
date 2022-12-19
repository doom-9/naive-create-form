<script setup lang="ts">
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import { AddFilled } from '@vicons/material'
import { LayoutOptions, options } from '../../const/const'
import type { State } from '../../store'

const store = useStore<State>()
window.$message = useMessage()
const handleAddClick = (value: string) => {
  store.commit('add', {
    value,
  })
}
const handleLayoutAddClick = (value: string) => {
  store.commit('add', {
    value,
  })
}
</script>

<template>
  <n-scrollbar>
    <n-space vertical>
      <n-divider title-placement="center">
        {{ $t("formComponent") }}
      </n-divider>
      <n-button
        v-for="item in options"
        :key="item.value"
        type="primary"
        size="large"
        round
        block
        icon-placement="right"
        @click="handleAddClick(item.value)"
      >
        {{ $t(item.formItemConfig.label) }}
        <template #icon>
          <n-icon size="20">
            <AddFilled />
          </n-icon>
        </template>
      </n-button>
      <n-divider title-placement="center">
        {{ $t("layoutComponent") }}
      </n-divider>
      <n-button
        v-for="item in LayoutOptions"
        :key="item.value"
        type="warning"
        size="large"
        round
        block
        icon-placement="right"
        @click="handleLayoutAddClick(item.value)"
      >
        {{ $t(item.formItemConfig.label) }}
        <template #icon>
          <n-icon size="20">
            <AddFilled />
          </n-icon>
        </template>
      </n-button>
    </n-space>
  </n-scrollbar>
</template>

<style></style>
