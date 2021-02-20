<template>
  <section class="ammio-button">
    <button v-bind="$attrs" @click="clicked">
      <slot/>
    </button>
  </section>
</template>

<script>
export default {
  name: 'ammio-button',
  inheritAttrs: false
}
</script>

<style lang="sass" scoped>
section.ammio-button
  width: 200px
  height: 40px
  button
    background: var(--color-primary)
    position: relative
    overflow: hidden
    font-family: Open-Sans
    font-weight: 1rem
    cursor: pointer
    width: 100%
    height: 40px
    border-radius: 12px
    border: none
    color: var(--color-text-alternative)
    outline: none
</style>
