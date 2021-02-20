<template>
  <div class="login">
    <h2>ammio</h2>
    <form @submit.prevent="onSubmit">
      <ammio-input type="text" placeholder="Username" v-model="username"/>
      <ammio-input type='password' placeholder="Password" v-model="password"/>
      <ammio-button type="submit" @click="submit">Login</ammio-button>
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
import ammioInput from '../components/partials/input'
import ammioButton from '../components/partials/button'

export default {
  name: 'login-view',
  components: {
    ammioButton,
    ammioInput
  },
  setup () {
    const router = useRouter()

    const username = ref('')
    const password = ref('')

    const submit = async (event) => {
      event.preventDefault()
      if (await login(username.value, password.value)) router.push({ name: 'home' })
      return false
    }
    return {
      username,
      password,
      submit
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
