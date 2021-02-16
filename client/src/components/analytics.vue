<template>
  <div class='analytics'>
    <online :id='website'/>
    <div class='stats'>
      <stat :title='"Page views"' :value='analytics.visits'/>
      <stat :title='"Visitors"' :value='analytics.visitors'/>
      <stat :title='"Avg visit time"' :value='analytics.visits'/>
    </div>
  </div>
</template>

<script>
import online from './partials/online'
import stat from './partials/stat'
import { ref } from 'vue'

export default {
  name: 'analytics',
  components: {
    online,
    stat
  },
  props: {
    website: String
  },
  async setup (props) {
    const analytics = ref(null)
    const timeframe = { start: new Date(), end: new Date() }
    timeframe.start.setDate(timeframe.start.getDate() - 7)
    const result = await fetch(`/api/analytics/get?website=${props.website}&start=${timeframe.start}&end=${timeframe.end}`)
    analytics.value = await result.json()
    return { analytics }
  }
}
</script>

<style lang='sass' scoped>
.analytics
  background: white
  padding: 25px
  border-radius: 8px
  display: grid
  grid-template-rows: auto
  grid-row-gap: 15px
  .stats
    display: grid
    grid-template-columns: repeat(3, minmax(auto, 150px))
    grid-column-gap: 15px
</style>
