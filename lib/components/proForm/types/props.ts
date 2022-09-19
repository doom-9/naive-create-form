import type {
  AutoCompleteProps,
  CheckboxGroupProps,
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  FormItemProps,
  FormItemRule,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TimePickerProps,
  UploadProps,
} from 'naive-ui'
import type { reqType } from '../../../utils/request'

type addCommonProps<T extends Record<string, any>> = T & {
  formItemProps?: Omit<FormItemProps, 'label' | 'path'>
  label: string
  key: string
  tooltipConfig?: {
    show: boolean
    text: string
  }
  rule?: FormItemRule
  dependencies?: string | string[]
  dependenciesChange?: (type: string, value: any) => void
}

export type ProFormItem =
  | addCommonProps<{
    type: 'input'
    props?: Omit<InputProps, 'onUpdateValue' | 'value'>
  }>
  | addCommonProps<{
    type: 'inputNumber'
    props?: Omit<InputNumberProps, 'onUpdateValue' | 'value'>
  }>
  | addCommonProps<{
    type: 'radio'
    props?:
    | Omit<RadioProps, 'label' | 'value' | 'checked' | 'onUpdateChecked'>
    | Omit<RadioGroupProps, 'onUpdateValue' | 'value'>
    valueEnum?: {
      label: string
      value: string | number
      disabled?: boolean
    }[]
  }>
  | addCommonProps<{
    type: 'select'
    props?: Omit<SelectProps, 'onUpdateValue' | 'value' | 'options'>
    valueEnum?: {
      label: string
      value: string | number
      disabled?: boolean
    }[]
  }>
  | addCommonProps<{
    type: 'rate'
    props?: Omit<RateProps, 'onUpdateValue' | 'value'>
  }>
  | addCommonProps<{
    type: 'switch'
    props?: Omit<SwitchProps, 'onUpdateValue' | 'value'>
  }>
  | addCommonProps<{
    type: 'timePicker'
    props?: Omit<TimePickerProps, 'onUpdateValue' | 'value'>
  }>
  | addCommonProps<{
    type: 'datePicker'
    props?: Omit<DatePickerProps, 'onUpdateValue' | 'value'>
  }>
  | addCommonProps<{
    type: 'colorPicker'
    props?: Omit<ColorPickerProps, 'onUpdateValue' | 'value'>
  }>
  | addCommonProps<{
    type: 'checkbox'
    props?:
    | Omit<
            CheckboxProps,
            'onUpdateChecked' | 'value' | 'label' | 'disabled'
          >
    | Omit<CheckboxGroupProps, 'onUpdateValue' | 'value'>
    valueEnum?: {
      label: string
      value: string | number
      disabled?: boolean
    }[]
  }>
  | addCommonProps<{
    type: 'upload'
    props?: Omit<UploadProps, 'fileList' | 'onUpdateFileList'>
    buttonText?: string
  }>
  | addCommonProps<{
    type: 'slider'
    props?: Omit<SliderProps, 'onUpdateValue' | 'value'>
  }>
  | {
    type: 'divider'
    dashed?: boolean
    titlePlacement?: 'left' | 'right' | 'center'
    vertical?: boolean
    text: string
  }
  | addCommonProps<{
    type: 'autoComplete'
    props?: Omit<AutoCompleteProps, 'onUpdateValue' | 'value' | 'options'>
    valueEnum?: string[]
    splitString: string
  }>
  | {
    type: 'slot'
    key: string
  }

export interface stepsProFormItem {
  key: string
  title: string
  formItems: ProFormItem[]
}

export interface requestConfig {
  methods?: reqType
  url: string
  headers?: Record<string, string>
}
