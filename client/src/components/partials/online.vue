<template>
  <div class='live' v-show='online > 0'>
    <span/>
    <p>{{ online }} current visitors</p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'live',
  props: {
    id: String
  },
  async setup (props) {
    const online = ref(null)
    const result = await fetch(`/api/analytics/online?website=${props.id}`)
    online.value = await result.json()
    return { online }
  }
}
</script>

<style lang='sass' scoped>
  .live
    display: grid
    grid-template-columns: auto 1fr
    grid-column-gap: 8px
    align-items: center
    span
      width: 15px
      height: 15px
      background: green
      border-radius: 10px
      display: inline-block
</style>
