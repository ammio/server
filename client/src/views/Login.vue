<template>
<div class="login-view">
  <sign-in-form />
</div>
</template>

<script>
/* IMPORT COMPONENTS */
import SignInForm from '../components/SignInForm'

export default {
  name: 'login-view',
  components: {
    SignInForm
  }
}
</script>

<style lang="sass" scoped>
.login-page
  height: 100%
  display: grid
  grid-row-gap: 25px
  justify-content: center
</style>
