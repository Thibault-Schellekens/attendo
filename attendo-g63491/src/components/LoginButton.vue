<script>
export default {
  name: 'LoginButton',
  methods: {
    login() {
      console.log('Login ');
    }
  }
}
</script>

<template>
  <button
    @click="login"
    class="bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
    Connexion avec Google
  </button>
</template>
