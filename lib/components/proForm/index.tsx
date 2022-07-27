/* eslint-disable react/no-string-refs */
import type { ComputedRef, PropType } from 'vue'

import {
  Fragment,
  computed,
  defineComponent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h,
  reactive,
  ref,
  watchEffect,
} from 'vue'
import type {
  CheckboxGroupProps,
  FormInst,
  FormProps,
  RadioGroupProps,
} from 'naive-ui'
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NColorPicker,
  NDatePicker,
  NDivider,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NRate,
  NSelect,
  NSlider,
  NSpace,
  NSwitch,
  NTimePicker,
  NTooltip,
  NUpload,
} from 'naive-ui'
import type { FormValidateCallback } from 'naive-ui/es/form/src/interface'
import type { FileInfo } from 'naive-ui/es/upload/src/interface'
import QuestionCircle48Regular from '../../icon/QuestionCircle48Regular.vue'
import request from '../../utils/request'
import type { ProFormItem, requestConfig } from './types/props'

const ProFormProps = {
  formProps: Object as PropType<Omit<FormProps, 'model'>>,
  formItems: {
    type: Array as PropType<ProFormItem[]>,
    default: [],
  },
  resetButton: Boolean,
  validateButton: Boolean,
  submitButton: {
    type: Boolean,
    default: true,
  },
  title: String,
  isKeyPressSubmit: Boolean,
  initialValues: Object as PropType<Record<string, any>>,
  values: Object as PropType<Record<string, any>>,
  onReset: Function as PropType<() => void>,
  onFinish: Function as PropType<(res: Record<string, any>) => void>,
  onError: Function as PropType<FormValidateCallback>,
  onValidate: Function as PropType<(value: Record<string, any>) => void>,
  onValuesChange: Function as PropType<(key: string, value: any) => void>,
  requestConfig: Object as PropType<requestConfig>,
}

export default defineComponent({
  name: 'ProForm',
  props: ProFormProps,
  setup(props) {
    const modalData = reactive<Record<string, any>>({})

    const handleInitialValues = () => {
      for (const key in props.initialValues) {
        if (Object.prototype.hasOwnProperty.call(props.initialValues, key))
          modalData[key] = props.initialValues[key]
      }
    }

    handleInitialValues()

    watchEffect(() => {
      if (props.values !== undefined) {
        for (const key in props.values) {
          if (Object.prototype.hasOwnProperty.call(props.values, key))
            modalData[key] = props.values[key]
        }
      }
    })

    const formRef = ref<FormInst | null>(null)

    const handleValidateClick = () => {
      formRef.value?.validate((errors) => {
        if (!errors)
          props?.onValidate && props.onValidate(modalData)
        else props?.onError && props.onError(errors)
      })
    }

    const handleResetClick = () => {
      for (const key in modalData) {
        if (Object.prototype.hasOwnProperty.call(modalData, key))
          modalData[key] = null
      }
      props?.onReset && props.onReset()
    }

    const handleSubmitClick = () => {
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          const requestConfig = props.requestConfig
          let res: Record<string, any>
          if (requestConfig === undefined) {
            res = modalData
          }
          else {
            res = await request(
              requestConfig.methods,
              requestConfig.url,
              modalData,
              requestConfig.headers,
            )
          }

          props?.onFinish && props.onFinish(res)
        }
        else {
          props?.onError && props.onError(errors)
        }
      })
    }

    const handleInputUpdateValue = (
      val: string | number | null | (string | number)[] | Required<FileInfo>[],
      key: string,
    ) => {
      modalData[key] = val
      props?.onValuesChange && props.onValuesChange(key, val)
    }

    const handleRadioUpdateChecked = (
      val: boolean,
      key: string,
      flag: string | number,
    ) => {
      if (val)
        modalData[key] = flag
      else modalData[key] = null
      props?.onValuesChange && props.onValuesChange(key, val)
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter')
        handleSubmitClick()
    }

    watchEffect(() => {
      if (props.isKeyPressSubmit)
        window.addEventListener('keydown', keyDownHandler)
      else window.removeEventListener('keydown', keyDownHandler)
    })

    const getNTooltipVnode = (item: ProFormItem) => {
      if (item.type === 'divider')
        return
      return item.tooltipConfig?.show
        ? (
        <NTooltip trigger="hover">
          {{
            trigger: () => (
              <NIcon size={20}>
                <QuestionCircle48Regular />
              </NIcon>
            ),
            default: () => item.tooltipConfig?.text,
          }}
        </NTooltip>
          )
        : null
    }

    const getNFormItemVnode: (
      item: ProFormItem
    ) => JSX.Element | JSX.Element[] | undefined = (item) => {
      switch (item.type) {
        case 'input':
          return (
            <NInput
              {...item.props}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )
        case 'inputNumber':
          return (
            <NInputNumber
              {...item.props}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'radio':
          return item.valueEnum.length > 1
            ? (
            <NRadioGroup
              {...(item.props as RadioGroupProps)}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            >
              {item.valueEnum.map(valueItem => (
                <NRadio {...valueItem} key={valueItem.value} />
              ))}
            </NRadioGroup>
              )
            : (
                item.valueEnum.map(valueItem => (
              <NRadio
                {...item.props}
                {...valueItem}
                key={valueItem.value}
                checked={valueItem.value === modalData[item.key]}
                onUpdateChecked={(value) => {
                  handleRadioUpdateChecked(value, item.key, valueItem.value)
                }}
              />
                ))
              )

        case 'select':
          return (
            <NSelect
              {...item.props}
              options={item.valueEnum}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'rate':
          return (
            <NRate
              {...item.props}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'switch':
          return (
            <NSwitch
              {...item.props}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'timePicker':
          return (
            <NTimePicker
              {...item.props}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            />
          )

        case 'datePicker':
          return (
            <NDatePicker
              {...item.props}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData[item.key]}
            />
          )

        case 'colorPicker':
          return (
            <NColorPicker
              {...item.props}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData[item.key]}
            />
          )

        case 'checkbox':
          return item.valueEnum.length > 1
            ? (
            <NCheckboxGroup
              {...(item.props as Omit<
                CheckboxGroupProps,
                'onUpdateValue' | 'value'
              >)}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData[item.key]}
            >
              {item.valueEnum.map(valueItem => (
                <NCheckbox key={valueItem.value} {...valueItem} />
              ))}
            </NCheckboxGroup>
              )
            : (
                item.valueEnum.map(valueItem => (
              <NCheckbox
                {...item.props}
                key={valueItem.value}
                {...valueItem}
                onUpdateChecked={(value) => {
                  handleInputUpdateValue(value, item.key)
                }}
                value={modalData[item.key]}
              />
                ))
              )

        case 'upload':
          return (
            <NUpload
              {...item.props}
              fileList={modalData[item.key] ?? []}
              onUpdateFileList={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
            >
              <NButton>{item.buttonText}</NButton>
            </NUpload>
          )

        case 'slider':
          return (
            <NSlider
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              value={modalData[item.key]}
            />
          )

        default:
          return undefined
      }
    }

    const Vnode: ComputedRef<JSX.Element[] | undefined> = computed(() => {
      const { formItems } = props
      return formItems?.map((item) => {
        if (item.type === 'divider') {
          return (
            <NDivider
              dashed={item.dashed}
              titlePlacement={item.titlePlacement}
              vertical={item.vertical}
            >
              {item.text}
            </NDivider>
          )
        }
        else {
          return (
            <NFormItem
              {...item.formItemProps}
              key={item.key}
              label={item.label}
              path={item.key}
              rule={item.rule}
            >
              {getNFormItemVnode(item)}
              {getNTooltipVnode(item)}
            </NFormItem>
          )
        }
      })
    })

    return {
      modalData,
      formRef,
      handleValidateClick,
      handleInputUpdateValue,
      handleRadioUpdateChecked,
      handleResetClick,
      handleSubmitClick,
      Vnode,
    }
  },
  render() {
    const {
      formProps,
      modalData,
      handleValidateClick,
      handleResetClick,
      handleSubmitClick,
      resetButton,
      validateButton,
      submitButton,
      title,
      Vnode,
    } = this

    return (
      <Fragment>
        {title ? <NDivider>{title}</NDivider> : null}
        <NForm {...formProps} model={modalData} ref="formRef">
          {Vnode}
        </NForm>
        <NSpace justify="center">
          {validateButton === true
            ? (
            <NButton onClick={handleValidateClick} type="warning">
              验证
            </NButton>
              )
            : null}
          {resetButton === true
            ? (
            <NButton onClick={handleResetClick} type="error">
              重置
            </NButton>
              )
            : null}
          {submitButton === true
            ? (
            <NButton onClick={handleSubmitClick} type="primary">
              提交
            </NButton>
              )
            : null}
        </NSpace>
      </Fragment>
    )
  },
})
