| 名称               |                     类型                     | 默认值 | 说明                                                                         |
| ------------------ | :------------------------------------------: | :----: | :--------------------------------------------------------------------------- |
| label              |                    string                    |   -    | 表单项名                                                                     |
| key                |                    string                    |   -    | 表单项标识，表单的值会收集到这个标识下；为防止出现收集错误，请确保此标识唯一 |
| formItemProps      |    Omit<FormItemProps, 'label' \| 'path'>    |   -    | 传递给 FormItem 组件的参数                                                   |
| tooltipConfig      |          show: boolean,text: string          |   -    | 配置提示                                                                     |
| dependencies       |              string \| string[]              |   -    | 与什么字段关联，当关联字段 change 时，触发自身的 dependenciesChange          |
| dependenciesChange |      (type: string, value: any) => void      |   -    | 被动触发的 dependenciesChange 函数                                           |
| normalize          |             (value: any) => any              |   -    | 前置函数，在表单值被收集之前执行，真正保存的是函数返回的值                   |
| rule               |                 FormItemRule                 |   -    | 表单规则配置                                                                 |
| props              | Omit<InputProps, 'onUpdateValue' \| 'value'> |   -    | 传递给每个具体组件的参数，示例：Input                                        |
| valueEnum          |                      -                       |   -    | 当 type 为'radio'或'select','checkbox','autoComplete'时所需要的参数          |
