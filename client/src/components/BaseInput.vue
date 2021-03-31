<template>
  <section class="ammio-input" :class="{ 'focused': focused }">
    <input v-bind="$attrs" :type="$attrs.type ? $attrs.type : 'text'" @input="$emit('update:modelValue', $event.target.value)" @focus="focus" @blur="blur" :value="modelValue" required/>
    <label>{{ placeholder }}</label>
  </section>
</template>

<script>
/* IMPORT VUE MODULES */
import { ref } from 'vue'

export default {
  name: 'base-input',
  props: {
    modelValue: {
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup () {
    const focused = ref(false)

    const focus = () => {
      focused.value = true
    }

    const blur = () => {
      focused.value = false
    }

    return {
      focused,
      focus,
      blur
    }
  }
}
</script>

<style lang='sass' scoped>
section.ammio-input
  position: relative
  background: var(--color-background-alternative)
  border-radius: 3px
  display: block
  width: 200px
  height: 40px
  padding: 10px 10px 10px 10px
  transition: 0.2s ease all
  --moz-transition: 0.2s ease all
  --webkit-transition: 0.2s ease all
  --o--transition: 0.2s easy all
  label
    color: var(--color-text-dimmed)
    position: absolute
    pointer-events: none
    left: 10px
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
  opacity: 0 !important
</style>
