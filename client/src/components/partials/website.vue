<template>
  <div class='website'>
    <h3 v-on:click.self='dashboard'>{{ website.domain }}</h3>
    <Suspence>
      <online :id='website._id'/>
    </Suspence>
  </div>
</template>

<script>
import online from './online'
import router from '../../router'

export default {
  components: { online },
  name: 'website',
  compoents: {
    online
  },
  props: {
    website: Object
  },
  methods: {
    dashboard () {
      router.push({
        path: 'dashboard',
        query: { id: this.website._id, domain: this.website.domain }
      })
    }
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
    h3
      cursor: pointer
      user-select: none
</style>
