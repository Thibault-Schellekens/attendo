<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<template>

  <AppHeader/>
  <main>
    <RouterView/>
  </main>

</template>

<style scoped>

</style>
