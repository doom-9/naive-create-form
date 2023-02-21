## 基础示例

<script setup>
import Base from '../demo/base.vue'
import { NMessageProvider } from 'naive-ui'
</script>

<ClientOnly>
<NMessageProvider>
<Base />
</NMessageProvider>
</ClientOnly>

## 代码

<<< @/demo/base.vue
