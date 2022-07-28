import type { State } from '../store'

type selectItem = Array<{
  value: string
  formItemConfig: {
    [key: string]: any
  }
}>

export const options: selectItem = [
  {
    value: '0',
    formItemConfig: {
      label: 'input',
      key: undefined,
      rules: [],
      clearable: false,
      maxlength: undefined,
      minlength: undefined,
      type: 'text',
      size: 'medium',
    },
  },
  {
    value: '1',
    formItemConfig: {
      label: 'inputNumber',
      key: undefined,
      rules: [],
      clearable: false,
      max: undefined,
      min: undefined,
      type: 'text',
      size: 'medium',
      step: 1,
      showButton: true,
    },
  },
  {
    value: '2',
    formItemConfig: {
      label: 'radio',
      key: undefined,
      rules: [],
      size: 'medium',
      options: [],
    },
  },
  {
    value: '3',
    formItemConfig: {
      label: 'rate',
      key: undefined,
      rules: [],
      size: 'medium',
      count: 5,
      allowHalf: false,
    },
  },
  {
    value: '4',
    formItemConfig: {
      label: 'select',
      key: undefined,
      rules: [],
      size: 'medium',
      multiple: false,
      placeholder: '请选择',
      clearable: false,
      options: [],
    },
  },
  {
    value: '5',
    formItemConfig: {
      label: 'slider',
      key: undefined,
      rules: [],
      max: 100,
      min: 0,
      step: 1,
      range: false,
      reverse: false,
      vertical: false,
      tooltip: true,
    },
  },
  {
    value: '6',
    formItemConfig: {
      label: 'switch',
      key: undefined,
      rules: [],
      round: true,
      size: 'medium',
    },
  },
  {
    value: '7',
    formItemConfig: {
      label: 'timePicker',
      key: undefined,
      rules: [],
      actions: [],
      clearable: false,
      format: 'HH:mm:ss',
      size: 'medium',
      placeholder: undefined,
      use12Hours: false,
    },
  },
  {
    value: '12',
    formItemConfig: {
      label: 'datePicker',
      key: undefined,
      rules: [],
      actions: [],
      clearable: false,
      format: '',
      size: 'medium',
      placeholder: undefined,
      type: 'date',
      startPlaceholder: undefined,
      endPlaceholder: undefined,
      separator: undefined,
    },
  },
  {
    value: '8',
    formItemConfig: {
      label: 'treeSelect',
      key: undefined,
      rules: [],
      size: 'medium',
      clearable: false,
    },
  },
  {
    value: '9',
    formItemConfig: {
      label: 'upload',
      key: undefined,
      rules: [],
      accept: undefined,
      action: undefined,
      defaultUpload: true,
      data: [],
      headers: [],
      listType: 'text',
      max: undefined,
      method: 'POST',
      multiple: false,
      fileName: 'file',
      withCredentials: false,
      showCancelButton: true,
      showDownloadButton: false,
      showRemoveButton: true,
      showRetryButton: true,
      showFileList: true,
    },
  },
  {
    value: '10',
    formItemConfig: {
      label: 'colorPicker',
      key: undefined,
      rules: [],
      size: 'medium',
      modes: [],
      showAlpha: true,
      actions: [],
    },
  },
  {
    value: '11',
    formItemConfig: {
      label: 'checkbox',
      key: undefined,
      rules: [],
      max: undefined,
      min: undefined,
      options: [],
    },
  },
]

export const LayoutOptions: selectItem = [
  {
    value: '13',
    formItemConfig: {
      label: 'divider',
      dashed: false,
      vertical: false,
      titlePlacement: 'center',
    },
  },
]

export const initialFormState: State['formConfig'] = {
  labelPlacement: 'left',
  labelWidth: '80',
  labelAlign: 'left',
  showRequireMark: false,
  size: 'medium',
  inline: false,
  showFeedback: true,
  showLabel: true,
  requireMarkPlacement: 'right',
  model: 'formValue',
}

export const UI_NAME = 'naive-ui'
export const PREFIX = 'n'

export const getItemConfig = (
  value: string,
): {
  [key: string]: any
} => {
  const mergeOptions = [...options, ...LayoutOptions]
  const config = mergeOptions.find(item => item.value === value)
  if (config !== undefined)
    return config.formItemConfig

  return {}
}

export const ruleOptions: Array<{
  value: string
  label: string
}> = [
  {
    label: 'Required verification',
    value: '0',
  },
  {
    label: 'Mobile phone number verification',
    value: '1',
  },
  {
    label: 'ID card verification',
    value: '2',
  },
]

// 0---string 1---booleanOrNumber 3---value
export const componentPropsConfig = {
  0: {
    clearable: 1,
    maxlength: 1,
    minlength: 1,
    type: 0,
    size: 0,
  },
  1: {
    clearable: 1,
    max: 1,
    min: 1,
    type: 0,
    size: 0,
    step: 1,
    showButton: 1,
  },
  2: {
    size: 0,
  },
  3: {
    size: 0,
    count: 1,
    allowHalf: 1,
  },
  4: {
    size: 0,
    multiple: 1,
    placeholder: 0,
    clearable: 1,
  },
  5: {
    max: 1,
    min: 1,
    step: 1,
    range: 1,
    reverse: 1,
    vertical: 1,
    tooltip: 1,
  },
  6: {
    round: 1,
    size: 0,
  },
  7: {
    clearable: 1,
    format: 0,
    size: 0,
    placeholder: 0,
    use12Hours: 1,
  },
  8: {
    size: 0,
    clearable: 1,
  },
  9: {
    accept: 0,
    action: 0,
    defaultUpload: 1,
    listType: 0,
    max: 1,
    method: 0,
    multiple: 1,
    fileName: 0,
    withCredentials: 1,
    showCancelButton: 1,
    showDownloadButton: 1,
    showRemoveButton: 1,
    showRetryButton: 1,
    showFileList: 1,
  },
  10: {
    size: 0,
    showAlpha: 1,
  },
  11: {
    max: 1,
    min: 1,
  },
  12: {
    clearable: 1,
    format: 0,
    size: 0,
    placeholder: 0,
    type: 0,
    startPlaceholder: 0,
    endPlaceholder: 0,
    separator: 0,
  },
}
