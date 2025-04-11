<script>
export default {
  name: "DataTable",
  props: {
    headers: Array,
    fields: Array,
    dataList: Array,
    selectedRows: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    handleRowClick(data, rowIndex) {
      this.$emit('row-click', data, rowIndex);
    },
    isSelected(rowIndex) {
      return this.selectedRows.includes(rowIndex);
    }
  }
}
</script>

<template>
  <div class="flex justify-center items-center">
    <table
        class=" w-5/6 border-collapse bg-gradient-to-r from-gray-900 to-fuchsia-900 rounded-lg overflow-hidden mb-12">
      <thead>
      <tr class="bg-gradient-to-r from-black to-fuchsia-800 text-white">
        <th v-for="(header, index) in headers" :key="index"
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b-2 border-fuchsia-700">
          {{ header }}
        </th>
      </tr>
      </thead>
      <tbody class="bg-gradient-to-r from-gray-800 to-fuchsia-900 divide-y divide-fuchsia-700">
      <tr v-for="(data, rowIndex) in dataList" :key="rowIndex"
          :class="['cursor-pointer  transition-colors duration-200',
              isSelected(rowIndex) ?
          'bg-gradient-to-r from-blue-400 to-blue-200 hover:to-blue-500 text-gray-800'
          : 'hover:bg-gradient-to-r hover:from-gray-700 hover:to-fuchsia-800 text-gray-100']">

        <td v-for="(field, colIndex) in fields" :key="colIndex" @click="handleRowClick(data, rowIndex)"
            class="px-6 py-4 whitespace-nowrap text-sm">
          <slot :name="field" :data="data">
            <span class="text-xl">
              {{ data[field] }}
            </span>
          </slot>

        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>