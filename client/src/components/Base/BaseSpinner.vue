<template>
  <span class="spinner">
    <span />
  </span>
</template>

<script>
export default {
  name: 'base-spinner'
}
</script>

<style lang="sass">
span.spinner
  position: relative
  width: 100%
  height: 100%
  span
    box-sizing: border-box
    display: block
    position: absolute
    width: 100%
    height: 100%
    border: 3px solid white
    border-radius: 50%
    border-color: white transparent transparent transparent
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite

@keyframes spinner
  0%
    transform: rotate(0turn)
  100%
    transform: rotate(1turn)
</style>
