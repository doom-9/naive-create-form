import type { State, ValueType } from '../store'

type addUndefined<T> = T | undefined

type sizeT = 'small' | 'medium' | 'large'

interface optionT {
  label: string
  value: string | number
}

interface uploadOptionT {
  key: string
  value: string
}

export type formItemT =
  | {
    value: '0'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      clearable: boolean
      maxlength: addUndefined<number>
      minlength: addUndefined<number>
      type: 'text' | 'password' | 'textarea'
      size: sizeT
    }
  }
  | {
    value: '1'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      clearable: boolean
      max: addUndefined<number>
      min: addUndefined<number>
      size: sizeT
      step: number
      showButton: boolean
    }
  }
  | {
    value: '2'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      size: sizeT
      options: optionT[]
    }
  }
  | {
    value: '3'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      size: sizeT | number
      count: number
      allowHalf: boolean
    }
  }
  | {
    value: '4'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      size: sizeT
      multiple: boolean
      placeholder: string
      clearable: boolean
      options: optionT[]
    }
  }
  | {
    value: '5'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      max: number
      min: number
      step: number
      range: boolean
      reverse: boolean
      vertical: boolean
      tooltip: boolean
    }
  }
  | {
    value: '6'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      round: boolean
      size: sizeT
    }
  }
  | {
    value: '7'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      actions: ('now' | 'confirm')[]
      clearable: boolean
      format: string
      size: sizeT
      placeholder: string
      use12Hours: boolean
    }
  }
  | {
    value: '8'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      size: sizeT
      clearable: boolean
    }
  }
  | {
    value: '9'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      accept: addUndefined<string>
      action: addUndefined<string>
      defaultUpload: boolean
      data: addUndefined<uploadOptionT[]>
      headers: addUndefined<uploadOptionT[]>
      listType: 'text' | 'image' | 'image-card'
      max: addUndefined<number>
      method: string
      multiple: boolean
      fileName: string
      withCredentials: boolean
      showCancelButton: boolean
      showDownloadButton: boolean
      showRemoveButton: boolean
      showRetryButton: boolean
      showFileList: boolean
    }
  }
  | {
    value: '10'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      size: sizeT
      modes: Array<'rgb' | 'hex' | 'hsl' | 'hsv'>
      showAlpha: boolean
      actions: Array<'confirm'>
    }
  }
  | {
    value: '11'
    formItemConfig: {
      label: string
      key: addUndefined<string>
      rules: Array<any>
      max: addUndefined<number>
      min: addUndefined<number>
      options: optionT[]
    }
  }
  | {
    value: '12'
    formItemConfig: {
      label: 'datePicker'
      key: addUndefined<string>
      rules: []
      actions: []
      clearable: false
      format: ''
      size: 'medium'
      placeholder: addUndefined<string>
      type: 'date'
      startPlaceholder: addUndefined<string>
      endPlaceholder: addUndefined<string>
      separator: addUndefined<string>
    }
  }
  | {
    value: '13'
    formItemConfig: {
      label: string
      dashed: boolean
      vertical: boolean
      titlePlacement: 'left' | 'right' | 'center'
    }
  }

export const options: formItemT[] = [
  {
    value: '0',
    formItemConfig: {
      label: 'input',
      key: 'input',
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
      key: 'inputNumber',
      rules: [],
      clearable: false,
      max: undefined,
      min: undefined,
      size: 'medium',
      step: 1,
      showButton: true,
    },
  },
  {
    value: '2',
    formItemConfig: {
      label: 'radio',
      key: 'radio',
      rules: [],
      size: 'medium',
      options: [],
    },
  },
  {
    value: '3',
    formItemConfig: {
      label: 'rate',
      key: 'rate',
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
      key: 'select',
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
      key: 'slider',
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
      key: 'switch',
      rules: [],
      round: true,
      size: 'medium',
    },
  },
  {
    value: '7',
    formItemConfig: {
      label: 'timePicker',
      key: 'timePicker',
      rules: [],
      actions: [],
      clearable: false,
      format: 'HH:mm:ss',
      size: 'medium',
      placeholder: '请选择时间',
      use12Hours: false,
    },
  },
  {
    value: '12',
    formItemConfig: {
      label: 'datePicker',
      key: 'datePicker',
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
      key: 'treeSelect',
      rules: [],
      size: 'medium',
      clearable: false,
    },
  },
  {
    value: '9',
    formItemConfig: {
      label: 'upload',
      key: 'upload',
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
      key: 'colorPicker',
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
      key: 'checkbox',
      rules: [],
      max: undefined,
      min: undefined,
      options: [],
    },
  },
]

export const LayoutOptions: formItemT[] = [
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

export const getItemConfig = (value: ValueType): formItemT | undefined => {
  const mergeOptions = [...options, ...LayoutOptions]
  const config = mergeOptions.find(item => item.value === value)
  if (config !== undefined)
    return config
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

// 0---string 1---booleanOrNumber 2---value
export const componentPropsConfig = {
  0: {
    key: 2,
    clearable: 1,
    maxlength: 1,
    minlength: 1,
    type: 0,
    size: 0,
  },
  1: {
    key: 2,
    clearable: 1,
    max: 1,
    min: 1,
    type: 0,
    size: 0,
    step: 1,
    showButton: 1,
  },
  2: {
    key: 2,
    size: 0,
  },
  3: {
    key: 2,
    size: 0,
    count: 1,
    allowHalf: 1,
  },
  4: {
    key: 2,
    size: 0,
    multiple: 1,
    placeholder: 0,
    clearable: 1,
  },
  5: {
    key: 2,
    max: 1,
    min: 1,
    step: 1,
    range: 1,
    reverse: 1,
    vertical: 1,
    tooltip: 1,
  },
  6: {
    key: 2,
    round: 1,
    size: 0,
  },
  7: {
    key: 2,
    clearable: 1,
    format: 0,
    size: 0,
    placeholder: 0,
    use12Hours: 1,
  },
  8: {
    key: 2,
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
    key: 2,
    size: 0,
    showAlpha: 1,
  },
  11: {
    key: 2,
    max: 1,
    min: 1,
  },
  12: {
    key: 2,
    clearable: 1,
    format: 0,
    size: 0,
    placeholder: 0,
    type: 0,
    startPlaceholder: 0,
    endPlaceholder: 0,
    separator: 0,
  },
  13: {
    dashed: 1,
    vertical: 1,
    titlePlacement: 0,
  },
}

export const formPropsConfig = {
  size: 0,
  inline: 1,
  labelWidth: 1,
  labelAlign: 0,
  labelPlacement: 0,
  showFeedback: 1,
  showLabel: 1,
  showRequireMark: 1,
  requireMarkPlacement: 0,
  model: 1,
}
