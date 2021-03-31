<template>
  <div class="login">
    <ammio-message v-if="message" :message="message" @close="closeMessage"/>
    <h2>ammio</h2>
    <form @submit.prevent="onSubmit">
      <base-input type="text" placeholder="Username" v-model="username"/>
      <base-input type='password' placeholder="Password" v-model="password"/>
      <base-button @click="submit" :loading="loading">Login</base-button>
    </form>
  </div>
</template>

<script>
/* IMPORT MODULES */
import { login } from '../modules/authentication'

/* IMPORT VUE MODULES */
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/* IMPORT COMPONENTS */
import ammioMessage from '../components/partials/message'

export default {
  name: 'login-view',
  components: {
    ammioMessage
  },
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
.login
  display: grid
  grid-row-gap: 25px
  justify-content: center
  h2
    text-align: center
  form
    display: grid
    grid-row-gap: 15px
    justify-content: center
</style>
