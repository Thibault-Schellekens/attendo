<script>
export default {
  name: "RoomInfo",
  props: {
    room: String,
    supervisor: String,
  }
}
</script>

<template>
  <div class="group w-40 h-24 bg-gray-50 border-2 rounded-xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover:border-fuchsia-500 hover:border-3">
    <div class="w-full border-b-2 p-4 group-hover:border-fuchsia-500 transition-all duration-200 transform">
      <div>{{ room }}</div>
    </div>
    <div class="pt-2 pb-2"><span class="font-bold">Surveillant</span> {{ supervisor }}</div>
  </div>
</template>

<style scoped>

</style>