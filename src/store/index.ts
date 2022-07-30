import { createStore } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { getItemConfig, initialFormState } from '../const/const'

export type ValueType =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'

export interface formItemType {
  value: ValueType
  id: string
  formItemConfig: {
    [key: string]: any
  }
}

export interface State {
  formItemArray: formItemType[]
  selectedFormItem: string
  selectedFormItemType: string
  autoAddImport: boolean
  confirmAndCancelBtn: boolean
  formConfig: {
    labelPlacement: 'left' | 'top'
    labelWidth: string
    labelAlign: 'left' | 'right'
    size: 'small' | 'medium' | 'large'
    inline: boolean
    showFeedback: boolean
    showLabel: boolean
    showRequireMark: boolean
    requireMarkPlacement: 'left' | 'right'
    model: string | undefined
  }
  tabsValue: 'form' | 'formItem'
  local: string
}

export const store = createStore<State>({
  strict: true,
  state() {
    return {
      formItemArray: [],
      autoAddImport: false,
      confirmAndCancelBtn: false,
      formConfig: initialFormState,
      selectedFormItem: '',
      selectedFormItemType: '',
      tabsValue: 'formItem',
      local: 'zh',
    }
  },
  mutations: {
    add(
      state: State,
      payload: Omit<formItemType, 'id' | 'formItemConfig'>,
    ): void {
      const id = uuidv4()
      state.formItemArray.push({
        id,
        formItemConfig: getItemConfig(payload.value),
        ...payload,
      })
      window.$message.success(state.local === 'zh' ? '操作成功' : 'Success')
    },
    addAndSelect(
      state: State,
      payload: Omit<formItemType, 'id' | 'formItemConfig'>,
    ): void {
      const id = uuidv4()
      state.formItemArray.push({
        id,
        formItemConfig: getItemConfig(payload.value),
        ...payload,
      })
      store.commit('changeSelectedFormItem', id)
      window.$message.success(state.local === 'zh' ? '操作成功' : 'Success')
    },
    remove(state: State, payload: string): void {
      state.formItemArray.splice(
        state.formItemArray.findIndex(item => item.id === payload),
        1,
      )
      window.$message.success(state.local === 'zh' ? '操作成功' : 'Success')
    },
    clear(state: State): void {
      state.formItemArray = []
    },
    copy(state: State, payload: string): void {
      const index = state.formItemArray.findIndex(
        item => item.id === payload,
      )
      if (index !== -1) {
        const newItem = { ...state.formItemArray[index] }
        newItem.id = uuidv4()
        state.formItemArray.splice(index + 1, 0, newItem)
      }
      window.$message.success(state.local === 'zh' ? '操作成功' : 'Success')
    },
    up(state: State, payload: string) {
      const index = state.formItemArray.findIndex(
        item => item.id === payload,
      )
      if (index > 0) {
        const item = state.formItemArray[index]
        state.formItemArray.splice(index, 1)
        state.formItemArray.splice(index - 1, 0, item)
      }
      else {
        window.$message.warning(
          state.local === 'zh' ? '已经是第一个了' : 'Already the first',
        )
      }
    },
    down(state: State, payload: string) {
      const index = state.formItemArray.findIndex(
        item => item.id === payload,
      )
      if (index < state.formItemArray.length - 1) {
        const item = state.formItemArray[index]
        state.formItemArray.splice(index, 1)
        state.formItemArray.splice(index + 1, 0, item)
      }
      else {
        window.$message.warning(
          state.local === 'zh' ? '已经是最后一个了' : 'Already the last',
        )
      }
    },
    exchange(state: State, payload: { id1: string; id2: string }) {
      const index1 = state.formItemArray.findIndex(
        item => item.id === payload.id1,
      )
      const index2 = state.formItemArray.findIndex(
        item => item.id === payload.id2,
      )
      if (index1 !== -1 && index2 !== -1) {
        const item1 = state.formItemArray[index1]
        const item2 = state.formItemArray[index2]
        state.formItemArray.splice(index1, 1, item2)
        state.formItemArray.splice(index2, 1, item1)
      }
    },
    insertDrop(state: State, payload: { from: number; to: number }) {
      if (payload.from !== -1 && payload.to !== -1) {
        if (payload.from < payload.to) {
          const item1 = state.formItemArray[payload.from]
          state.formItemArray.splice(payload.from, 1)
          state.formItemArray.splice(payload.to, 0, item1)
        }
        if (payload.from > payload.to) {
          const item1 = state.formItemArray[payload.from]
          state.formItemArray.splice(payload.from, 1)
          state.formItemArray.splice(payload.to, 0, item1)
        }

        // dom diff
        state.formItemArray = state.formItemArray.map((item) => {
          item.id = uuidv4()
          return item
        })
      }
    },
    changeAutoAddImport(state: State, payload: boolean) {
      state.autoAddImport = payload
      window.$message.success(state.local === 'zh' ? '操作成功' : 'Success')
    },
    changeFormConfig(state: State, payload: Partial<State['formConfig']>) {
      state.formConfig = {
        ...state.formConfig,
        ...payload,
      }
      window.$message.success(state.local === 'zh' ? '操作成功' : 'Success')
    },
    changeSelectedFormItem(state: State, payload: string) {
      state.selectedFormItem = payload
      const index = state.formItemArray.findIndex(
        item => item.id === payload,
      )
      if (index !== -1)
        state.selectedFormItemType = state.formItemArray[index].value
    },
    changeSelectedFormItemConfig(
      state: State,
      payload: formItemType['formItemConfig'],
    ) {
      const index = state.formItemArray.findIndex(
        item => item.id === state.selectedFormItem,
      )
      if (index !== -1) {
        state.formItemArray[index].formItemConfig = {
          ...state.formItemArray[index].formItemConfig,
          ...payload,
        }
      }
      else {
        window.$message.warning(
          state.local === 'zh'
            ? '请先选择一个表单项'
            : 'Please select a form item',
        )
      }
    },
    changeTabsValue(state: State, payload: State['tabsValue']) {
      state.tabsValue = payload
    },
    changeConfirmAndCancelBtn(state: State, payload: boolean) {
      state.confirmAndCancelBtn = payload
    },
    changeLocal(state: State, payload: State['local']) {
      state.local = payload
    },
  },
  getters: {
    formItemArrayLength(state) {
      return state.formItemArray.length
    },
    formItemConfig(state) {
      return state.formItemArray.find(
        item => item.id === state.selectedFormItem,
      )?.formItemConfig
    },
    selectedFormItem(state) {
      const index = state.formItemArray.findIndex(
        item => item.id === state.selectedFormItem,
      )
      if (index !== -1)
        return state.formItemArray[index]

      return null
    },
  },
})
