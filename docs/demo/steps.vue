<script setup>
import { NCard, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { ProForm } from 'naive-create-form'

const message = useMessage()

const formItems = [
  {
    key: 'step1',
    title: 'step1',
    formItems: [
      {
        type: 'input',
        label: '姓名',
        key: 'name',
        tooltipConfig: {
          show: true,
          text: '自己的真实姓名',
        },
      },
      {
        type: 'inputNumber',
        label: '年龄',
        key: 'age',
      },
      {
        type: 'radio',
        label: '婚姻情况',
        key: 'maritalStatus',
        valueEnum: [
          {
            label: '已婚',
            value: '1',
          },
          {
            label: '未婚',
            value: '0',
          },
        ],
      },
    ],
  },
  {
    key: 'step2',
    title: 'step2',
    formItems: [
      {
        type: 'select',
        label: '爱好',
        key: 'like',
        valueEnum: [
          {
            label: '足球',
            value: '0',
          },
          {
            label: '篮球',
            value: '1',
          },
          {
            label: '乒乓球',
            value: '2',
            disabled: true,
          },
        ],
      },
      {
        type: 'rate',
        label: '朋友打分',
        key: 'rate',
      },
      {
        type: 'switch',
        label: '是否工作',
        key: 'job',
      },
    ],
  },
  {
    key: 'step3',
    title: 'step3',
    formItems: [
      {
        type: 'timePicker',
        label: '早上几点起床',
        key: 'getup',
        tooltipConfig: {
          show: true,
          text: '时分秒',
        },
      },
      {
        type: 'datePicker',
        label: '出生年月',
        key: 'born',
      },
      {
        type: 'colorPicker',
        label: '喜欢的颜色',
        key: 'color',
        tooltipConfig: {
          show: true,
          text: '多彩的颜色',
        },
      },
      {
        type: 'checkbox',
        label: '喜欢的食物',
        key: 'food',
        valueEnum: [
          {
            label: '苹果',
            value: '0',
          },
          {
            label: '香蕉',
            value: '1',
          },
          {
            label: '西瓜',
            value: '2',
            disabled: true,
          },
        ],
      },
      {
        type: 'upload',
        label: '上传头像',
        key: 'avatar',
        buttonText: '上传图片',
      },
      {
        type: 'slider',
        label: '自我打分',
        key: 'slider',
        rule: {
          required: true,
          message: '请自我打分',
          trigger: ['change'],
          type: 'number',
        },
      },
    ],
  },
]

const formProps = {
  labelPlacement: 'left',
  rules: {
    name: {
      required: true,
      message: '请输入姓名',
      trigger: ['input'],
    },
  },
}

const initialValues = {
  name: 'hello',
}

const onValuesChange = (key, value) => {
  message.success(`${key}--${value}`)
}

const value = ref({
  age: 22,
})
</script>

<template>
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
  <NCard>
    <ProForm
      v-model="value"
      :form-items="formItems"
      :form-props="formProps"
      title="个人信息录入"
      reset-button
      is-key-press-submit
      :initial-values="initialValues"
      :on-values-change="onValuesChange"
      steps
      :steps-form-items="formItems"
    />
  </NCard>
</template>
