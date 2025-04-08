<script>
export default {
  name: 'NavigationLinks'
}
</script>

<template>
  <div class="flex space-x-6">
    <RouterLink to="/" class="text-gray-600 hover:text-gray-800">Accueil</RouterLink>
    <RouterLink to="/sessions" class="text-gray-600 hover:text-gray-800">Sessions</RouterLink>
    <RouterLink to="/about" class="text-gray-600 hover:text-gray-800">A propos</RouterLink>
  </div>
</template>
