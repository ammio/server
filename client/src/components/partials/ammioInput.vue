<template>
  <section class="ammio-input" :class="{ 'focused': focused }">
    <input v-bind="$attrs" :type="$attrs.type ? $attrs.type : 'text'" @input="$emit('update:modelValue', $event.target.value)" @focus="focused = true" @blur="focused = false" required/>
    <label>{{ placeholder }}</label>
  </section>
</template>

<script>
export default {
  name: 'ammio-input',
  inheritAttrs: false,
  props: {
    modelValue: String,
    placeholder: String
  },
  data: () => ({
    focused: false
  })
}
</script>

<style lang='sass' scoped>
section.ammio-input
  position: relative
  margin: 5px
  background: var(--color-background-alternative)
  border-radius: 12px
  display: block
  width: 200px
  height: 40px
  padding: 10px 13px 10px 13px
  transition: 0.2s ease all
  --moz-transition: 0.2s ease all
  --webkit-transition: 0.2s ease all
  --o--transition: 0.2s easy all
  label
    color: var(--color-text-dimmed)
    position: absolute
    pointer-events: none
    left: 13px
    top: 50%
    transform: translateY(-50%)
    opacity: 0.5
    transition: 0.2s ease all
    --moz-transition: 0.2s ease all
    --webkit-transition: 0.2s ease all
    --o--transition: 0.2s easy all
  input
    width: 100%
    border: none
    outline: none
    font-family: Open-Sans
    font-size: 1rem
    background: none
    transition: 0.2s easy all

section.focused
    padding: 10px 13px 10px 18px
    label
      opacity: 0 !important
      left: 20px

section input:valid ~ label
  background: pink
  opacity: 0 !important
</style>
