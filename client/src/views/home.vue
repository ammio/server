<template>
  <div class='home'>
    <navbar :heading='"ammio"'/>
    <Suspense>
      <websites/>
    </Suspense>
  </div>
</template>

<script>
import websites from '../components/websites'
import navbar from '../components/navbar'

export default {
  name: 'home',
  components: {
    websites,
    navbar
  }
}
</script>
