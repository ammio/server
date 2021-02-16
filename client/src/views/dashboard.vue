<template>
  <div class="dashboard">
    <navbar :heading='domain'/>
    <Suspense>
      <analytics :website='id'/>
    </Suspense>
  </div>
</template>

<script>
import navbar from '../components/navbar'
import analytics from '../components/analytics'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'dashbaord',
  components: {
    navbar,
    analytics
  },
  setup () {
    const route = useRoute()
    const id = ref(null)
    const domain = ref(null)

    id.value = route.query.id
    domain.value = route.query.domain
    return { id, domain }
  }
}
</script>

<style lang="sass" scoped>
.dashboard
  display: grid
  grid-template-rows: auto 1fr
  grid-row-gap: 15px
</style>
