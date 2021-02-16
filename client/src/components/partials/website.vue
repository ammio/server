<template>
  <div class='website'>
    <h3>{{ website.domain }}</h3>
    <Suspence>
      <online :id='website._id'/>
    </Suspence>
  </div>
</template>

<script>
import online from './online'

export default {
  components: { online },
  name: 'website',
  compoents: {
    online
  },
  props: {
    website: Object
  }
}
</script>

<style lang='sass' scoped>
  .website
    padding: 15px 25px
    background: white
    border-radius: 8px
    display: grid
    grid-template-columns: auto 1fr
    grid-column-gap: 25px
    align-items: center
</style>
