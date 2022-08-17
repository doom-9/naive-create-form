import {
  PREFIX,
  UI_NAME,
  componentPropsConfig,
  formPropsConfig,
} from '../const/const'
import type { ValueType, formItemType } from '../store'
import { store } from '../store'

export function isValidKey(
  key: string | number | symbol,
  object: object,
): key is keyof typeof object {
  return key in object
}

interface bindConfig {
  name: string
  val: any
}

const typeToImport: Record<string, string[]> = {
  0: ['Input'],
  1: ['InputNumber'],
  2: ['Radio', 'RadioGroup', 'Space'],
  3: ['Rate'],
  4: ['Select'],
  5: ['Slider'],
  6: ['Switch'],
  7: ['TimePicker'],
  8: ['TreeSelect'],
  9: ['Upload'],
  10: ['ColorPicker'],
  11: ['Checkbox', 'CheckboxGroup', 'Space'],
  12: ['DatePicker'],
  13: ['Divider'],
}

// bind

const combineNameAndValue = (
  name: string,
  val: any,
): {
  name: string
  val: any
} => {
  return {
    name,
    val,
  }
}

const bindBooleanAndNumberConfig = (config: bindConfig): string => {
  return `${
    config.val !== undefined
      ? `:${String(config.name)}="${String(config.val)}"`
      : ''
  }`
}

const bindStringConfig = (config: bindConfig): string => {
  return `${
    config.val !== undefined
      ? `${String(config.name)}="${String(config.val)}"`
      : ''
  }`
}

const bindValueConfig = (config: bindConfig): string => {
  return `${
    config.val !== undefined
      ? `v-model="${
          store.state.formConfig.model !== undefined
            ? `${store.state.formConfig.model}.`
            : ''
        }${String(config.val)}"`
      : ''
  }`
}

const bindFileListConfig = (config: bindConfig): string => {
  return `${
    config.val !== undefined ? `v-model:file-list="${String(config.val)}"` : ''
  }`
}

// formItemConfig

const getFormItemConfig = (item: formItemType): string => {
  if (item.value === '13')
    return ''
  else
    return `label="${item.formItemConfig.label}" path="${item.formItemConfig.key}"`
}

const getFormItemContentConfig = (
  item: { [key: string]: any },
  type: ValueType,
): string => {
  if (Object.keys(item).length === 0)
    return ''

  const isUpload = type === '9'

  const propsConfig = componentPropsConfig[type]

  const strArray = []

  for (const key in propsConfig) {
    if (Object.prototype.hasOwnProperty.call(propsConfig, key)) {
      if (isValidKey(key, propsConfig)) {
        const type = propsConfig[key]
        if (type === 0) {
          strArray.push(bindStringConfig(combineNameAndValue(key, item[key])))
        }
        else if (type === 1) {
          strArray.push(
            bindBooleanAndNumberConfig(combineNameAndValue(key, item[key])),
          )
        }
        else if (type === 2) {
          if (isUpload) {
            strArray.push(
              bindFileListConfig(combineNameAndValue(key, item[key])),
            )
          }
          else {
            strArray.push(bindValueConfig(combineNameAndValue(key, item[key])))
          }
        }
      }
    }
  }

  return strArray.join(' ')
}

const getTypeToFormItem = (item: formItemType): string => {
  const type = item.value
  const formItemConfig = getFormItemConfig(item)
  const formItemContentConfig = getFormItemContentConfig(
    item.formItemConfig,
    type,
  )
  switch (type) {
    case '0':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-input ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '1':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-input-number ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '2':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-radio-group ${formItemContentConfig}>
          <${PREFIX}-space>
            ${item.formItemConfig.options
              .map(
                option =>
                  `<${PREFIX}-radio value="${option.value}">${option.label}</${PREFIX}-radio>`,
              )
              .join('')}
          </${PREFIX}-space>
        </${PREFIX}-radio-group>
      </${PREFIX}-form-item>`
    case '3':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-rate ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '4':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-select ${formItemContentConfig} />
      </${PREFIX}-form-item>`
    case '5':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-slider ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '6':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-switch ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '7':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-time-picker ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '8':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
          <${PREFIX}-tree-select ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '9':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-upload ${formItemContentConfig}>
          <${PREFIX}-button>上传文件</${PREFIX}-button>
        </${PREFIX}-upload>
      </${PREFIX}-form-item>`
    case '10':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-color-picker ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    case '11':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-checkbox-group ${formItemContentConfig}>
          <${PREFIX}-space item-style="display: flex;">
            ${item.formItemConfig.options
              .map(
                option =>
                  `<${PREFIX}-checkbox value="${option.value}" label="${option.label}"/>`,
              )
              .join('')}
          </${PREFIX}-space>
        </${PREFIX}-checkbox-group>
      </${PREFIX}-form-item>`
    case '13':
      return `
        <${PREFIX}-divider ${formItemContentConfig}>${
        item.formItemConfig.label ?? ''
      }</${PREFIX}-divider>`
    case '12':
      return `
      <${PREFIX}-form-item ${formItemConfig}>
        <${PREFIX}-date-picker ${formItemContentConfig}/>
      </${PREFIX}-form-item>`
    default:
      return ''
  }
}

const getFormItemImport = (data: formItemType[]): string => {
  const prefix = PREFIX.toUpperCase()
  const { confirmAndCancelBtn } = store.state
  const array: string[] = []
  data.forEach((item) => {
    return typeToImport[item.value].forEach((importItem) => {
      array.push(`${prefix}${importItem} ,`)
    })
  })
  // button
  if (confirmAndCancelBtn) {
    ['Button', 'Space'].forEach((item) => {
      array.push(`${prefix}${item} ,`)
    })
  }
  return `${Array.from(new Set(array)).join('')}`
}

// formConfig

const getFormConfig = (): string => {
  const formConfig = store.state.formConfig

  const strArray = []

  for (const key in formPropsConfig) {
    if (Object.prototype.hasOwnProperty.call(formPropsConfig, key)) {
      if (isValidKey(key, formPropsConfig)) {
        const type = formPropsConfig[key]
        if (type === 0) {
          strArray.push(
            bindStringConfig(combineNameAndValue(key, formConfig[key])),
          )
        }
        else if (type === 1) {
          strArray.push(
            bindBooleanAndNumberConfig(
              combineNameAndValue(key, formConfig[key]),
            ),
          )
        }
        else if (type === 2) {
          strArray.push(
            bindValueConfig(combineNameAndValue(key, formConfig[key])),
          )
        }
      }
    }
  }

  return strArray.join(' ')
}

// import

const getImport = (data: formItemType[]): string => {
  const prefix = PREFIX.toUpperCase()
  if (store.state.autoAddImport) {
    const importStr = `
<script setup type="ts">
  import { ${getFormItemImport(
    data,
  )} ${prefix}Form, ${prefix}FormItem } from '${UI_NAME}';
</script>
    `
    return importStr
  }

  return ''
}

// confirmAndCancelButton

const getConfirmAndCancelButton = (): string => {
  const { confirmAndCancelBtn } = store.state
  if (confirmAndCancelBtn) {
    return `
      <${PREFIX}-form-item>
        <${PREFIX}-space justify="center">
          <${PREFIX}-button @click="handleValidateClick">确认</${PREFIX}-button>
          <${PREFIX}-button>取消</${PREFIX}-button>
        </${PREFIX}-space>
      </${PREFIX}-form-item>`
  }
  return ''
}

// rules

const getRulesObject = (data: formItemType[]): string => {
  const rulesArray: string[] = []

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.value === '13')
      continue
    const rules = item.formItemConfig.rules
    const itemRulesArray: string[] = []

    for (let i = 0; i < rules.length; i++) {
      const element = rules[i]
      switch (element) {
        case '0':
          itemRulesArray.push(
            `{ required: true, message: '请输入${item.formItemConfig.label}', trigger: 'blur' },`,
          )
          break
        case '1':
          itemRulesArray.push(
            `{ validator: (rule,value)=>{
              let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
              if(!reg.test(value)){
                return new Error('请输入正确的${item.formItemConfig.label}');
              }
              return true;
            }, message: '请输入正确的${item.formItemConfig.label}', trigger: 'blur' },`,
          )
          break
        case '2':
          itemRulesArray.push(
            `{ validator: (rule,value)=>{
              let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
              if(!reg.test(value)){
                return new Error('请输入正确的${item.formItemConfig.label}');
              }
              return true;
            }, message: '请输入正确的${item.formItemConfig.label}', trigger: 'blur' },`,
          )
          break
        default:
          break
      }
    }

    rulesArray.push(`${item.formItemConfig.key}: [
      ${itemRulesArray.join('')}
    ],`)
  }

  if (rulesArray.length === 0)
    return ''

  return `
  const rules = {
    ${rulesArray.join('')}
  }
`
}

// entry

export const generateCode = (data: formItemType[]): string => {
  const Code = `
  <template>
    <${PREFIX}-form ${getFormConfig()}>
    ${data.map(item => getTypeToFormItem(item)).join('')}
    ${getConfirmAndCancelButton()}
    </${PREFIX}-form>
  </template>
  <script setup type="ts">
  ${getImport(data)}
  ${getRulesObject(data)}
  </script>
  `

  return Code
}

export const generateConfig = (): string => {
  const Code = JSON.stringify(store.state.formItemArray)

  return Code
}

// normal

export const copy = (value: string): void => {
  const textarea = document.createElement('textarea')
  textarea.value = value
  document.body.appendChild(textarea)
  textarea.select()
  // 暂时没有可用的替代方法。
  // 确切的说这个 API 本来也不是标准 API，而是一个 IE 的私有 API，在 IE9 时被引入，后续的若干年里陆续被 Chrome / Firefix / Opera 等浏览器也做了兼容支持，但始终没有形成标准。
  // 这个 API 被废弃的主要原因第一个就是安全问题，在用户未经授权的情况下就可以执行一些敏感操作，这就很恐怖了；第二个问题是因为这是一个同步方法，而且操作了 DOM 对象，会阻塞页面渲染和脚本执行，因当初还没 Promise，所以没设计成异步，挖坑了。新设计的 API 肯定是要解决这两个问题。
  // 不过 W3C 也正在拟草案，大概率以后会引入一个叫 Clipboard 的类型（Chrome 66.0 开始已经有这个类型了，不过还不能用，相关 API 仅存在于文档中），用来处理跟剪贴版相关的操作，不过之后肯定会是像现在获取地理位置啊、麦克风啊什么的，浏览器先会弹出一个对话框让用户授权，你才能读写剪贴板了。
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function copyPropertyValue<T, K extends keyof T>(
  obj: T,
  target: T,
  key: K,
): void {
  obj[key] = target[key]
}

export function getParentElement(
  element: HTMLElement | null,
): HTMLElement | null {
  if (element === null)
    return null

  let currElement: HTMLElement | null = element
  while (currElement != null) {
    if (currElement.dataset.drag === 'doom')
      return currElement

    currElement = currElement.parentElement
  }
  return null
}
