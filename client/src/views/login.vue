<template>
  <div class="login">
    <h2>ammio</h2>
    <form @submit.prevent='onSubmit'>
      <input type='text' placeholder='username' required v-model='username'/>
      <input type='password' placeholder='password' required v-model='password'/>
      <button type='summit' @click='submit'>Login</button>
    </form>
  </div>
</template>

<script>
import { login } from '../modules/authentication'

export default {
  name: 'Login',
  components: {
  },
  data () {
    return { username: '', password: '' }
  },
  methods: {
    async submit (e) {
      e.preventDefault()
      if (await login(this.username, this.password)) this.$router.push('/')
      return false
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
    grid-row-gap: 10px
    justify-content: center
</style>
