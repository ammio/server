<template>
  <header>
    <h2>ammio</h2>
    <button @click='logout'>logout</button>
  </header>
</template>

<script>
import { logout } from '../modules/authentication'

export default {
  methods: {
    logout () {
      if (logout()) this.$router.push('/login')
    }
  }
}
</script>

<style lang="sass" scoped>
header
  display: grid
  grid-template-columns: 1fr auto
</style>
