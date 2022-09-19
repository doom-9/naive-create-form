| 名称               |                          类型                          |  默认值   | 说明                                     |
| ------------------ | :----------------------------------------------------: | :-------: | :--------------------------------------- |
| modal              |                        boolean                         |   false   | 是否启用 modal                           |
| modal-show         |                        boolean                         |   false   | 是否显示 modal                           |
| modal-props        | Omit<ModalProps, 'show' \| 'onUpdateShow' \| 'preset'> | undefined | modal 组件接受的参数                     |
| drawer             |                        boolean                         |   false   | 是否启用 drawer                          |
| drawer-show        |                        boolean                         |   false   | 是否显示 drawer                          |
| drawer-props       |      Omit<DrawerProps, 'show' \| 'onUpdateShow'>       | undefined | drawer 组件接受的参数                    |
| form-props         |                Omit<FormProps, 'model'>                | undefined | form 组件接受的参数                      |
| form-items         |                     ProFormItem[]                      |    []     | 表单项配置                               |
| reset-button       |                        boolean                         |   false   | 是否显示重置按钮                         |
| validate-button    |                        boolean                         |   false   | 是否显示校验按钮                         |
| submit-button      |                        boolean                         |   true    | 是否显示提交按钮                         |
| steps              |                        boolean                         |   false   | 是否启用分步表单                         |
| spin               |                        boolean                         |   false   | 是否启用提交自动 loading                 |
| stepsFormItems     |                   stepsProFormItem[]                   |    []     | 分步表单配置                             |
| title              |                         string                         | undefined | 表单标题                                 |
| transform          |          (value: Record<string, any>) => any           | undefined | 表单提交的前置函数，对表单数据进行处理   |
| isKeyPressSubmit   |                        boolean                         |   false   | 按下回车提交表单                         |
| initialValues      |                  Record<string, any>                   | undefined | 表单初始数据                             |
| modelValue         |                  Record<string, any>                   | undefined | 表单绑定数据                             |
| autoPlaceholder    |                        boolean                         |   false   | 自动生成 placeholder                     |
| onReset            |                       () => void                       | undefined | 点击`重置`按钮的回调                     |
| onFinish           |                       () => void                       | undefined | 表单提交完成的回调                       |
| onError            |                  FormValidateCallback                  | undefined | 表单校验出错的回调                       |
| onValidate         |          (value: Record<string, any>) => void          | undefined | 点击`校验`按钮的回调                     |
| onValuesChange     |           (key: string, value: any) => void            | undefined | 表单项数据改变的回调（监听某个数据更新） |
| onUpdateModelValue |          (value: Record<string, any>) => void          | undefined | 表单项数据改变的回调                     |
| onUpdateModalShow  |                (value: boolean) => void                | undefined | modal 显示隐藏的回调                     |
| onUpdateDrawerShow |                (value: boolean) => void                | undefined | drawer 显示隐藏的回调                    |
| requestConfig      |                     requestConfig                      | undefined | 请求配置                                 |
