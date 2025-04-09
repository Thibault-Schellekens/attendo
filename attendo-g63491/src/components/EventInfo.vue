<script>
export default {
  name: "UEInfo",
  props: {
    title: String,
  }
}
</script>

<template>
  <div class="w-32 h-64 shadow-lg cursor-pointer transition-all duration-300 text-center hover:shadow-xl">
    <div class="bg-teal-500 text-white mb-1.5 p-2 uppercase font-bold">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<style scoped>

</style>