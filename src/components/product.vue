<template>
  <div>

  </div>
</template>
<script>
import { socketBus, debugEvent } from '@/websocket'
export default {
  mounted () {
    socketBus.$on(debugEvent, this.dealResult) // sockeBus绑定debugEvent事件
  },
  beforeDestroy () {
    socketBus.$off(debugEvent) // sockeBus解绑debugEvent事件
  }
}
</script>
