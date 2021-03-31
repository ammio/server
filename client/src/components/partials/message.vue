<template>
  <div class="message-overlay">
    <div class="message">
      <h3>{{ message.title }}</h3>
      <p>{{ message.content }}</p>
      <div class="controls">
        <base-button @click="$emit('close')">Close</base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ammio-message',
  props: {
    message: Object
  }
}
</script>

<style lang="sass" scoped>
div.message-overlay
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 100
  position: fixed
  background: var(--color-text)
  display: grid
  justify-content: center
  align-content: center
  .message
    width: 100%
    max-width: 420px
    min-width: 250px
    background: var(--color-background)
    border-radius: 10px
    padding: 15px 20px
    display: grid
    grid-template-rows: repeat(3, auto)
    grid-row-gap: 10px
    .controls
      display: grid
      justify-content: right
</style>
