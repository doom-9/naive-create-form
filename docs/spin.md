## Spin

<script setup>
import Spin from './demo/spin.vue'
import { NMessageProvider } from 'naive-ui'
</script>

<ClientOnly>
<NMessageProvider>
<Spin />
</NMessageProvider>
</ClientOnly>

## 代码

<<< @/demo/spin.vue
