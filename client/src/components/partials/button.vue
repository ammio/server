<template>
  <section class="ammio-button">
    <button v-bind="$attrs" @click="clicked">
      <slot/>
    </button>
  </section>
</template>

<script>
export default {
  name: 'ammio-button'
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
    transition: 0.2s easy all
  button:disabled
    cursor: unset
    background: var(--color-background-alternative)
    color: var(--color-text)
</style>
