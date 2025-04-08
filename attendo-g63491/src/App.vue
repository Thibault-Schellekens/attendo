<script>
import {mapStores} from "pinia";
import {useAuthStore} from "@/stores/AuthStore.js";
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  created() {
    this.authStore.init();
  },
  methods: {
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
