<script>
import {mapStores} from "pinia";
import {useAuthStore} from "@/stores/AuthStore.js";

export default {
  name: "HomeView",
  computed: {
    ...mapStores(useAuthStore),
    isConnected() {
      return this.authStore.isConnected;
    }
  }
}
</script>

<template>
  <div>
    <h2>Accueil</h2>
    <div v-if="isConnected">
      <p>
        Bonjour, {{ this.authStore.user.email }}
      </p>
    </div>
    <div v-else>
      <p>Bienvenue, veuillez vous connecter pour plus de contenu !</p>
    </div>
  </div>
</template>
