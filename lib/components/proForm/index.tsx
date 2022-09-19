import type { ComputedRef, PropType } from 'vue'

import {
  Fragment,
  computed,
  defineComponent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h,
  reactive,
  ref,
  renderSlot,
  watch,
  watchEffect,
} from 'vue'
import type {
  CheckboxGroupProps,
  DrawerProps,
  FormInst,
  FormProps,
  ModalProps,
  RadioGroupProps,
} from 'naive-ui'
import {
  NAutoComplete,
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NColorPicker,
  NDatePicker,
  NDivider,
  NDrawer,
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
  NSpin,
  NStep,
  NSteps,
  NSwitch,
  NTimePicker,
  NTooltip,
  NUpload,
} from 'naive-ui'
import type { FormValidateCallback } from 'naive-ui/es/form/src/interface'
import type { FileInfo } from 'naive-ui/es/upload/src/interface'
import QuestionCircle48Regular from '../../icon/QuestionCircle48Regular.vue'
import request from '../../utils/request'
import type {
  ProFormItem,
  requestConfig,
  stepsProFormItem,
} from './types/props'

const ProFormProps = {
  'modal': Boolean,
  'modalShow': Boolean,
  'modalProps': Object as PropType<Omit<ModalProps, 'show' | 'onUpdateShow'>>,
  'drawer': Boolean,
  'drawerShow': Boolean,
  'drawerProps': Object as PropType<Omit<DrawerProps, 'show' | 'onUpdateShow'>>,
  'formProps': Object as PropType<Omit<FormProps, 'model' | 'preset'>>,
  'formItems': {
    type: Array as PropType<ProFormItem[]>,
    default: [],
  },
  'stepsFormItems': {
    type: Array as PropType<stepsProFormItem[]>,
    default: [],
  },
  'resetButton': Boolean,
  'validateButton': Boolean,
  'submitButton': {
    type: Boolean,
    default: true,
  },
  'steps': Boolean,
  'spin': Boolean,
  'title': String,
  'isKeyPressSubmit': Boolean,
  'initialValues': Object as PropType<Record<string, any>>,
  'modelValue': Object as PropType<Record<string, any>>,
  'autoPlaceholder': Boolean,
  'requestConfig': Object as PropType<requestConfig>,
  'transform': Function as PropType<(value: Record<string, any>) => any>,
  'onReset': Function as PropType<() => void>,
  'onFinish': Function as PropType<(res: Record<string, any>) => void>,
  'onError': Function as PropType<FormValidateCallback>,
  'onValidate': Function as PropType<(value: Record<string, any>) => void>,
  'onUpdateModalShow': Function as PropType<(value: boolean) => void>,
  'onUpdate:modalShow': Function as PropType<(value: boolean) => void>,
  'onUpdate:modelValue': Function as PropType<
    (res: Record<string, any>) => void
  >,
  'onUpdateModelValue': Function as PropType<(res: Record<string, any>) => void>,
  'onUpdateDrawerShow': Function as PropType<(value: boolean) => void>,
  'onUpdate:drawerShow': Function as PropType<(value: boolean) => void>,
  'onValuesChange': Function as PropType<(key: string, value: any) => void>,
}

export default defineComponent({
  name: 'ProForm',
  props: ProFormProps,
  setup(props, { slots, expose }) {
    const modalData = reactive<Record<string, any>>({})

    const stepsCurrent = ref<number>(1)

    const stepsStatus = ref<'process' | 'finish' | 'error' | 'wait'>('process')

    const spinStatus = ref<boolean>(false)

    const dependenceConfig = ref<
      Record<string, Set<(value: any) => void> | undefined>
        >({})

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
      spinStatus.value = true
      const { onFinish, onError, transform, steps, stepsFormItems } = props
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          if (steps) {
            stepsStatus.value = 'process'
            const length = stepsFormItems.length
            if (stepsCurrent.value < length)
              stepsCurrent.value++

            return
          }

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
          spinStatus.value = false
        }
        else {
          if (steps)
            stepsStatus.value = 'error'

          onError && onError(errors)
          spinStatus.value = false
        }
      })
    }

    expose({
      submit: handleSubmitClick,
      reset: handleResetClick,
      validate: handleValidateClick,
    })

    const handleInputUpdateValue = (
      val: string | number | null | (string | number)[] | Required<FileInfo>[],
      key: string,
    ) => {
      modalData[key] = val
      props?.onValuesChange && props.onValuesChange(key, val)
      const changeTarget = dependenceConfig.value[key]
      if (changeTarget !== undefined) {
        changeTarget.forEach((item) => {
          item(val)
        })
      }
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
      if (item.type === 'divider' || item.type === 'slot')
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

        case 'autoComplete':
          return (
            <NAutoComplete
              {...item.props}
              value={modalData[item.key]}
              onUpdateValue={(value) => {
                handleInputUpdateValue(value, item.key)
              }}
              options={item.valueEnum?.map((suffix) => {
                const prefix = modalData[item.key].value.split(
                  item.splitString,
                )[0]
                return {
                  label: prefix + suffix,
                  value: prefix + suffix,
                }
              })}
            />
          )

        default:
          return undefined
      }
    }

    const getFormItemVnode = (formItems: ProFormItem[]) => {
      const { autoPlaceholder } = props
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
        if (item.type === 'slot')
          return renderSlot(slots, item.key)

        if (autoPlaceholder) {
          let text: string
          if (
            item.type === 'input'
            || item.type === 'inputNumber'
            || item.type === 'autoComplete'
          ) {
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

        if (
          item.dependencies !== undefined
          && item.dependenciesChange !== undefined
        ) {
          const dependenciesChange = item.dependenciesChange
          if (typeof item.dependencies === 'string') {
            const target = dependenceConfig.value[item.dependencies]
            if (target !== undefined) {
              target.add(dependenciesChange)
            }
            else {
              dependenceConfig.value[item.dependencies] = new Set([
                dependenciesChange,
              ])
            }
          }
          else {
            item.dependencies.forEach((dependenceItem) => {
              const target = dependenceConfig.value[dependenceItem]
              if (target !== undefined) {
                target.add(dependenciesChange)
              }
              else {
                dependenceConfig.value[dependenceItem] = new Set([
                  dependenciesChange,
                ])
              }
            })
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
      })
    }

    const Vnode: ComputedRef<JSX.Element[] | undefined> = computed(() => {
      const { formItems, steps, stepsFormItems } = props
      if (steps) {
        return getFormItemVnode(
          stepsFormItems[stepsCurrent.value - 1].formItems,
        )
      }
      else {
        return getFormItemVnode(formItems)
      }
    })

    const stepsVnode: ComputedRef<JSX.Element[]> = computed(() => {
      const { stepsFormItems } = props
      return stepsFormItems.map(item => (
        <NStep key={item.key} title={item.title}></NStep>
      ))
    })

    const submitBtnText = computed(() => {
      const { steps, stepsFormItems } = props
      if (steps) {
        const length = stepsFormItems.length
        if (stepsCurrent.value < length)
          return '下一步'
        else return '提交'
      }
      else {
        return '提交'
      }
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
              {submitBtnText.value}
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

    const handleDrawerShowChange = (value: boolean) => {
      props.onUpdateDrawerShow && props.onUpdateDrawerShow(value)
      props['onUpdate:drawerShow'] && props['onUpdate:drawerShow'](value)
    }

    return {
      modalData,
      stepsCurrent,
      stepsStatus,
      spinStatus,
      formRef,
      handleValidateClick,
      handleInputUpdateValue,
      handleRadioUpdateChecked,
      handleResetClick,
      handleSubmitClick,
      handleModalShowChange,
      handleDrawerShowChange,
      Vnode,
      BtnsVnode,
      stepsVnode,
    }
  },
  render() {
    const {
      steps,
      spin,
      formProps,
      stepsCurrent,
      stepsStatus,
      spinStatus,
      modalData,
      title,
      Vnode,
      BtnsVnode,
      stepsVnode,
      modal,
      modalShow,
      modalProps,
      drawer,
      drawerShow,
      drawerProps,
      handleModalShowChange,
      handleDrawerShowChange,
    } = this

    const commonVnode = spin
      ? (
      <NSpin show={spinStatus}>
        <NForm {...formProps} model={modalData} ref="formRef">
          {Vnode}
        </NForm>
        {BtnsVnode}
      </NSpin>
        )
      : (
      <Fragment>
        <NForm {...formProps} model={modalData} ref="formRef">
          {Vnode}
        </NForm>
        {BtnsVnode}
      </Fragment>
        )

    return steps
      ? (
      <NSpace vertical size={50} align="stretch">
        <NSteps current={stepsCurrent} status={stepsStatus}>
          {stepsVnode}
        </NSteps>
        {commonVnode}
      </NSpace>
        )
      : modal
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
        {commonVnode}
      </NModal>
          )
        : drawer
          ? (
      <NDrawer
        show={drawerShow}
        {...drawerProps}
        onUpdateShow={handleDrawerShowChange}
      >
        {title ? <NDivider>{title}</NDivider> : null}
        {commonVnode}
      </NDrawer>
            )
          : (
      <Fragment>
        {title ? <NDivider>{title}</NDivider> : null}
        {commonVnode}
      </Fragment>
            )
  },
})
