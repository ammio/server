<template>
  <div class="dashboard">
    <navbar :heading='domain'/>
  </div>
</template>

<script>
import navbar from '../components/navbar'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'dashbaord',
  components: {
    navbar
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
