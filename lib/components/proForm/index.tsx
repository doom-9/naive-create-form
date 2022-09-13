import type { ComputedRef, PropType } from 'vue'

import {
  Fragment,
  computed,
  defineComponent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue'
import type {
  CheckboxGroupProps,
  FormInst,
  FormProps,
  ModalProps,
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
  NModal,
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
  'modal': Boolean,
  'modalShow': Boolean,
  'modalProps': Object as PropType<Omit<ModalProps, 'show'>>,
  'formProps': Object as PropType<Omit<FormProps, 'model' | 'preset'>>,
  'formItems': {
    type: Array as PropType<ProFormItem[]>,
    default: [],
  },
  'resetButton': Boolean,
  'validateButton': Boolean,
  'submitButton': {
    type: Boolean,
    default: true,
  },
  'title': String,
  'isKeyPressSubmit': Boolean,
  'initialValues': Object as PropType<Record<string, any>>,
  'modelValue': Object as PropType<Record<string, any>>,
  'autoPlaceholder': Boolean,
  'onReset': Function as PropType<() => void>,
  'onFinish': Function as PropType<(res: Record<string, any>) => void>,
  'onError': Function as PropType<FormValidateCallback>,
  'onValidate': Function as PropType<(value: Record<string, any>) => void>,
  'onValuesChange': Function as PropType<(key: string, value: any) => void>,
  'onUpdateModalShow': Function as PropType<(value: boolean) => void>,
  'onUpdate:modalShow': Function as PropType<(value: boolean) => void>,
  'requestConfig': Object as PropType<requestConfig>,
  'onUpdate:modelValue': Function as PropType<
    (res: Record<string, any>) => void
  >,
  'onUpdateModelValue': Function as PropType<(res: Record<string, any>) => void>,
  'transform': Function as PropType<(value: Record<string, any>) => any>,
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
      if (props.modelValue !== undefined) {
        for (const key in props.modelValue) {
          if (Object.prototype.hasOwnProperty.call(props.modelValue, key))
            modalData[key] = props.modelValue[key]
        }
      }
    })

    watch(modalData, () => {
      props.onUpdateModelValue && props.onUpdateModelValue(modalData)
      props['onUpdate:modelValue'] && props['onUpdate:modelValue'](modalData)
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
      const { onFinish, onError, transform } = props
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          const requestConfig = props.requestConfig
          let res: Record<string, any>
          const data = transform ? transform(modalData) : modalData
          if (requestConfig === undefined) {
            res = data
          }
          else {
            res = await request(
              requestConfig.methods,
              requestConfig.url,
              data,
              requestConfig.headers,
            )
          }

          onFinish && onFinish(res)
        }
        else {
          onError && onError(errors)
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
          if (item.valueEnum) {
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
          }
          else {
            return []
          }

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
          if (item.valueEnum) {
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
          }
          else {
            return []
          }

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
      const { formItems, autoPlaceholder } = props
      return formItems?.map((item) => {
        if (item.type === 'divider') {
          return (
            <NDivider
              dashed={item.dashed}
              titlePlacement={item.titlePlacement}
              vertical={item.vertical}
              key={item.text}
            >
              {item.text}
            </NDivider>
          )
        }
        else {
          if (autoPlaceholder) {
            let text: string
            if (item.type === 'input' || item.type === 'inputNumber') {
              text = `请输入${item.label}`

              if (item.props) {
                item.props.placeholder = text
              }
              else {
                item.props = {
                  placeholder: text,
                }
              }
            }

            if (
              item.type === 'select'
              || item.type === 'timePicker'
              || item.type === 'datePicker'
            ) {
              text = `请选择${item.label}`

              if (item.props) {
                item.props.placeholder = text
              }
              else {
                item.props = {
                  placeholder: text,
                }
              }
            }
          }

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

    const BtnsVnode: ComputedRef<JSX.Element> = computed(() => {
      const { resetButton, validateButton, submitButton } = props
      return (
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
      )
    })

    const handleModalShowChange = (value: boolean) => {
      props.onUpdateModalShow && props.onUpdateModalShow(value)
      props['onUpdate:modalShow'] && props['onUpdate:modalShow'](value)
    }

    return {
      modalData,
      formRef,
      handleValidateClick,
      handleInputUpdateValue,
      handleRadioUpdateChecked,
      handleResetClick,
      handleSubmitClick,
      handleModalShowChange,
      Vnode,
      BtnsVnode,
    }
  },
  render() {
    const {
      formProps,
      modalData,
      title,
      Vnode,
      BtnsVnode,
      modal,
      modalShow,
      modalProps,
      handleModalShowChange,
    } = this

    return modal
      ? (
      <NModal
        show={modalShow}
        preset="card"
        style={{
          width: '50%',
        }}
        {...modalProps}
        onUpdateShow={handleModalShowChange}
      >
        {title ? <NDivider>{title}</NDivider> : null}
        <NForm {...formProps} model={modalData} ref="formRef">
          {Vnode}
        </NForm>
        {BtnsVnode}
      </NModal>
        )
      : (
      <Fragment>
        {title ? <NDivider>{title}</NDivider> : null}
        <NForm {...formProps} model={modalData} ref="formRef">
          {Vnode}
        </NForm>
        {BtnsVnode}
      </Fragment>
        )
  },
})
