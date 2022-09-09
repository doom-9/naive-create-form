import type { State } from '../store'

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
    value: 'input'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      clearable: boolean
      maxlength: addUndefined<number>
      minlength: addUndefined<number>
      type: 'text' | 'password' | 'textarea'
      size: sizeT
    }
  }
  | {
    value: 'inputNumber'
    formItemConfig: {
      label: string
      key: string
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
    value: 'radio'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      size: sizeT
      options: optionT[]
    }
  }
  | {
    value: 'rate'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      size: sizeT | number
      count: number
      allowHalf: boolean
    }
  }
  | {
    value: 'select'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      size: sizeT
      multiple: boolean
      placeholder: string
      clearable: boolean
      options: optionT[]
    }
  }
  | {
    value: 'slider'
    formItemConfig: {
      label: string
      key: string
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
    value: 'switch'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      round: boolean
      size: sizeT
    }
  }
  | {
    value: 'timePicker'
    formItemConfig: {
      label: string
      key: string
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
    value: 'treeSelect'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      size: sizeT
      clearable: boolean
    }
  }
  | {
    value: 'upload'
    formItemConfig: {
      label: string
      key: string
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
    value: 'colorPicker'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      size: sizeT
      modes: Array<'rgb' | 'hex' | 'hsl' | 'hsv'>
      showAlpha: boolean
      actions: Array<'confirm'>
    }
  }
  | {
    value: 'checkbox'
    formItemConfig: {
      label: string
      key: string
      rules: Array<any>
      max: addUndefined<number>
      min: addUndefined<number>
      options: optionT[]
    }
  }
  | {
    value: 'datePicker'
    formItemConfig: {
      label: string
      key: string
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
    value: 'divider'
    formItemConfig: {
      label: string
      dashed: boolean
      vertical: boolean
      titlePlacement: 'left' | 'right' | 'center'
    }
  }

export const options: formItemT[] = [
  {
    value: 'input',
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
    value: 'inputNumber',
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
    value: 'radio',
    formItemConfig: {
      label: 'radio',
      key: 'radio',
      rules: [],
      size: 'medium',
      options: [],
    },
  },
  {
    value: 'rate',
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
    value: 'select',
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
    value: 'slider',
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
    value: 'switch',
    formItemConfig: {
      label: 'switch',
      key: 'switch',
      rules: [],
      round: true,
      size: 'medium',
    },
  },
  {
    value: 'timePicker',
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
    value: 'datePicker',
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
    value: 'treeSelect',
    formItemConfig: {
      label: 'treeSelect',
      key: 'treeSelect',
      rules: [],
      size: 'medium',
      clearable: false,
    },
  },
  {
    value: 'upload',
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
    value: 'colorPicker',
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
    value: 'checkbox',
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
    value: 'divider',
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
  value: formItemT['value'],
): formItemT | undefined => {
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
  input: {
    key: 2,
    clearable: 1,
    maxlength: 1,
    minlength: 1,
    type: 0,
    size: 0,
  },
  inputNumber: {
    key: 2,
    clearable: 1,
    max: 1,
    min: 1,
    type: 0,
    size: 0,
    step: 1,
    showButton: 1,
  },
  radio: {
    key: 2,
    size: 0,
  },
  rate: {
    key: 2,
    size: 0,
    count: 1,
    allowHalf: 1,
  },
  select: {
    key: 2,
    size: 0,
    multiple: 1,
    placeholder: 0,
    clearable: 1,
  },
  slider: {
    key: 2,
    max: 1,
    min: 1,
    step: 1,
    range: 1,
    reverse: 1,
    vertical: 1,
    tooltip: 1,
  },
  switch: {
    key: 2,
    round: 1,
    size: 0,
  },
  timePicker: {
    key: 2,
    clearable: 1,
    format: 0,
    size: 0,
    placeholder: 0,
    use12Hours: 1,
  },
  treeSelect: {
    key: 2,
    size: 0,
    clearable: 1,
  },
  upload: {
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
  colorPicker: {
    key: 2,
    size: 0,
    showAlpha: 1,
  },
  checkbox: {
    key: 2,
    max: 1,
    min: 1,
  },
  datePicker: {
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
  divider: {
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
