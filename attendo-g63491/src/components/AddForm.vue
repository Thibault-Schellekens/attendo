<script>
export default {
  name: "AddForm",
  props: {
    title: String,
    description: String,
    placeholder: String,
    buttonText: {
      type: String,
      default: "Ajouter"
    },
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
      <div class="flex items-center gap-3">
        <div class="relative flex items-center gap-2">
          <label for="session" class="text-gray-600 font-medium">{{ description }}</label>

          <template v-if="inputType === 'input'">
            <input
                v-model="newData"
                id="session"
                type="text"
                class="pl-4 pr-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors duration-200"
                :placeholder="placeholder">
          </template>

          <template v-else-if="inputType === 'select'">
            <select v-model="newData"
                    id="session"
                    class="pl-4 pr-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors duration-200">
              <option value="" disabled selected>Sélectionner une option</option>
              <option v-for="(option, index) in options" :key="index" :value="option.ue">{{ option.ue }}</option>
            </select>
          </template>
        </div>

        <button
            type="submit"
            class="bg-gradient-to-r from-purple-500 to-purple-400 text-white font-medium px-6 py-2 rounded-lg hover:from-purple-600 hover:to-purple-500 shadow-sm transition-all duration-200 transform hover:scale-105">
          {{ buttonText }}
        </button>
      </div>
    </form>

  </div>
</template>

<style scoped>

</style>