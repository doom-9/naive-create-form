## Slot

<script setup>
import Slot from '../demo/slot.vue'
import { NMessageProvider } from 'naive-ui'
</script>

<ClientOnly>
<NMessageProvider>
<Slot />
</NMessageProvider>
</ClientOnly>

## 代码

<<< @/demo/slot.vue
