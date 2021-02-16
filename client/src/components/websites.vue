<template>
  <div class='websites'>
    <website v-for='website in websites' :key='website._id' :website='website'/>
  </div>
</template>

<script>
import website from './partials/website'
import { ref } from 'vue'

export default {
  name: 'Dashbaord',
  components: {
    website
  },
  async setup () {
    const websites = ref(null)
    const result = await fetch('/api/websites')
    websites.value = await result.json()
    return { websites }
  }
}
</script>

<style lang='sass' scoped>
  .websites
    margin-top: 20px
    display: grid
    grid-row-gap: 10px
</style>
