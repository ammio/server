<template>
  <div class='navbar'>
    <h2>{{ heading }}</h2>
    <button>logout</button>
  </div>
</template>

<script>
import { logout } from '../modules/authentication'

export default {
  name: 'heading',
  props: {
    heading: String
  },
  methods: {
    logout () {
      logout()
    }
  }
}
</script>

<style lang='sass' scoped>
  .navbar
    display: grid
    grid-template-columns: 1fr auto
</style>
