<script>
import {mapStores} from "pinia";
import {useAuthStore} from "@/stores/AuthStore.js";
import {supabase} from "@/lib/supabaseClient.js";
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      instruments: [],
    }
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  created() {
    this.authStore.init()
  },
  methods: {
    async getInstruments() {
      const {data} = await supabase.from('group').select();
      this.instruments = data;
    }
  },
  mounted() {
    this.getInstruments();
  }
}
</script>

<template>

  <AppHeader/>
  <main>
    <RouterView/>
    <ul>
      <li v-for="instrument in instruments" key="instrument.id">
        {{ instrument.name }}
      </li>
    </ul>
  </main>

</template>

<style scoped>

</style>
