<script>
import NavigationLinks from "@/components/NavigationLinks.vue";
import LoginButton from "@/components/LoginButton.vue";

export default {
  name: 'AppHeader',
  components: {
    NavigationLinks,
    LoginButton,
  }
}
</script>

<template>
  <header>
    <div class="bg-black py-5">
      <h1 class="text-center text-fuchsia-400 text-5xl font-bold">Attendo</h1>
    </div>
    <nav class="bg-gray-100 py-3 px-4 flex justify-between items-center border-b-2">
      <NavigationLinks />
      <LoginButton />
    </nav>
  </header>
</template>
