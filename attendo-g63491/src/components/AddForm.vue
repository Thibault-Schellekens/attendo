<script>
export default {
  name: "AddForm",
  props: {
    title: String,
    description: String,
    inputType: {
      type: String,
      default: "input",
    },
    options: {
      type: Array,
      default: () => [],
    }

  },
  data() {
    return {
      newData: "",
    }
  },
  emits: ['add'],
  methods: {
    addData() {
      this.$emit("add", this.newData);
      this.newData = "";
    }
  }
}
</script>

<template>
  <div class="bg-gradient-to-r from-white to-purple-100 rounded-lg p-6 mt-8 shadow-md border border-purple-200">
    <h3 class="text-purple-700 font-semibold text-xl mb-4">{{ title }}</h3>

    <form action="" @submit.prevent="addData">
      <div class="flex gap-3">
        <div class="relative">
          <div
              class="absolute inset-y-0.5 left-2 flex items-center pl-2 pr-2 border-r-4 border-purple-200 rounded-b-3xl rounded-t-3xl">
            <label for="session" class="text-gray-600 font-medium">{{ description }}</label>
          </div>
          <template v-if="inputType === 'input'">
            <input
                v-model="newData"
                id="session"
                type="text"
                class="w-full pl-40 pr-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors duration-200"
                placeholder="Nom de la session">
          </template>
          <template v-else-if="inputType === 'select'">
            <div class="pl-40">
            <select v-model="newData"
                    id="session"
                    class="pr-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors duration-200">
              <option value="" disabled selected>Sélectionner une option</option>
              <option v-for="(option, index) in options" :key="index" :value="option.ue">{{ option.ue }}</option>

            </select>
            </div>
          </template>

        </div>
        <button
            type="submit"
            class="bg-gradient-to-r from-purple-500 to-purple-400 text-white font-medium px-6 py-2 rounded-lg hover:from-purple-600 hover:to-purple-500 shadow-sm transition-all duration-200 transform hover:scale-105">
          Ajouter
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>