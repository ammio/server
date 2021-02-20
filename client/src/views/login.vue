<template>
  <div class="login">
    <h2>ammio</h2>
    <form @submit.prevent='onSubmit'>
      <ammio-input type='text' placeholder='Username' v-model='username'/>
      <ammio-input type='password' placeholder='Password' v-model='password'/>
      <ammio-button type="submit" @click="submit">Login</ammio-button>
    </form>
  </div>
</template>

<script>
import { login } from '../modules/authentication'
import ammioInput from '../components/partials/ammioInput'
import ammioButton from '../components/partials/ammioButton'
export default {
  name: 'Login',
  components: {
    ammioInput,
    ammioButton
  },
  dat: () => ({
    username: '',
    password: ''
  }),
  methods: {
    async submit (e) {
      e.preventDefault()
      console.log('login >>>', this.username, this.password)
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
    grid-row-gap: 15px
    justify-content: center
</style>
