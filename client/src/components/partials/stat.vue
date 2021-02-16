<template>
  <div class='stat'>
    <h3 class='value'>{{ value }}</h3>
    <p class='title'>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: 'stat',
  props: {
    title: String,
    value: Number
  }
}
</script>

<style lang='sass' scoped>
.stat
  display: grid
  grid-template-rows: 1fr auto
  grid-row-gap: 5px
  .value
    font-size: 2.5rem
</style>
