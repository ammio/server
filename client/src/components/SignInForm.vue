<template>
  <form @submit.prevent="onSubmit">
    <base-input type="text" placeholder="Username" v-model="username"/>
    <base-input type='password' placeholder="Password" v-model="password"/>
    <base-button @click="submit" :loading="loading">Login</base-button>
  </form>
</template>

<script>
/* IMPORT MODULES */
import { login } from '../api/authentication'

/* IMPORT VUE MODULES */
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/* IMPORT COMPONENTS */

export default {
  name: 'sign-in-form',
  setup () {
    const router = useRouter()

    const username = ref('')
    const password = ref('')
    const message = ref(null)

    const loading = ref(false)

    const submit = async (event) => {
      event.preventDefault()
      loading.value = true
      try {
        await login(username.value, password.value)
        router.push({ name: 'home' })
      } catch (error) {
        password.value = ''
        loading.value = false
        message.value = { title: 'Login Error', content: error.message }
      }
    }

    const closeMessage = () => {
      message.value = null
    }

    return {
      username,
      password,
      message,
      loading,
      submit,
      closeMessage
    }
  }
}
</script>

<style lang="sass" scoped>
form
  display: grid
  grid-row-gap: 15px
  justify-content: center
</style>
