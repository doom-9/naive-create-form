| 名称               |                 类型                 |  默认值   | 说明                 |
| ------------------ | :----------------------------------: | :-------: | :------------------- |
| form-props         |       Omit<FormProps, 'model'>       | undefined | form 组件接受的参数  |
| reset-button       |               boolean                |   false   | 是否显示重置按钮     |
| validate-button    |               boolean                |   false   | 是否显示校验按钮     |
| submit-button      |               boolean                |   true    | 是否显示提交按钮     |
| title              |                string                | undefined | 表单标题             |
| isKeyPressSubmit   |               boolean                |   false   | 按下回车提交表单     |
| initialValues      |         Record<string, any>          | undefined | 表单初始数据         |
| modelValue         |         Record<string, any>          | undefined | 表单绑定数据         |
| onReset            |              () => void              | undefined | 点击`重置`按钮的回调 |
| onFinish           |              () => void              | undefined | 表单提交完成的回调   |
| onError            |         FormValidateCallback         | undefined | 表单校验出错的回调   |
| onValidate         | (value: Record<string, any>) => void | undefined | 点击`校验`按钮的回调 |
| onValuesChange     |  (key: string, value: any) => void   | undefined | 表单项数据改变的回调 |
| onUpdateModelValue | (value: Record<string, any>) => void | undefined | 表单项数据改变的回调 |
