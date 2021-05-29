<template>
  <button @click="clicked" :class="{ 'loading': loading }" :disabled="loading">
    <span class="text"><slot /></span>
    <base-spinner />
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
button
  background: var(--color-primary)
  position: relative
  overflow: hidden
  width: 100%
  height: 40px
  padding: 0px 15px
  border-radius: 3px
  border: none
  color: white
  outline: none
  font-size: 1rem
  span.text
    transition: opacity display 0.2s
  span.spinner
    opacity: 0
    display: none
    width: 20px
    height: 20px
    margin: 0 auto

button:disabled
  background: var(--color-text)

button:hover:enabled
  background: var(--color-primary)

button:active:enabled
  background: var(--color-primary)

button.loading
  span.text
    display: none
    opacity: 0
  span.spinner
    display: block
    opacity: 1
</style>
