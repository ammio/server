<template>
  <div class='new-website'>
    <form @submit.prevent='onSubmit'>
      <input type='text' placeholder='domain' required v-model='domain'/>
      <button type='submit' @click='submit'>Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'newWebsite',
  data () {
    return { domain: '' }
  },
  methods: {
    async submit (e) {
      e.preventDefault()
      const result = await fetch('/api/websites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ domain: this.domain }) })
      const website = await result.json()
      alert(`<script async defer id="ammio" type="module" website_id="${website._id}" src="http://%ammio-server%/ammio.js"></scrip>`) // TODO: // fix script tag vue parsing error
      this.$router.push('/')
      return false
    }
  }
}
</script>

<style lang='sass' scoped>
.new-website
  form
    display: grid
    grid-template-columns: 1fr auto
    grid-column-gap: 10px
</style>
