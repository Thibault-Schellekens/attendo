<script>
import {mapStores} from "pinia";
import {useAuthStore} from "@/stores/AuthStore.js";

export default {
  name: 'LoginButton',
  computed: {
    ...mapStores(useAuthStore),
    isConnected() {
      return this.authStore.isConnected;
    }
  },
  methods: {
    login() {
      this.authStore.loginWithGoogle();
    },
    logout() {
      this.authStore.logout();
      this.$router.push("/");
    }
  }
}
</script>

<template>
  <button
      v-if="!isConnected"
      @click.prevent="login"
      class="bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
    Connexion avec Google
  </button>
  <button
      v-else
      @click="logout"
      class="cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  </button>
</template>
