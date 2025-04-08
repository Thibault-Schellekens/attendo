<script>
import {useRouter} from "vue-router";

export default {
  name: "Breadcrumb",
  computed: {
    breadcrumbs() {
      const route = this.$route;
      const result = [];

      let currentRoute = route;
      while (currentRoute) {
        if (currentRoute.meta && currentRoute.meta.breadcrumb) {
          result.unshift({
            label: currentRoute.meta.breadcrumb,
            to: currentRoute.path,
          });
        }

        if (currentRoute.meta && currentRoute.meta.parent) {
          const parentName = currentRoute.meta.parent;
          currentRoute = this.$router.options.routes.find(r => r.name === parentName);
        } else {
          currentRoute = null;
        }
      }

      if (result.length > 0) {
        result[result.length - 1].isLast = true;
      }

      return result;
    }
  }
}
</script>

<template>
  <nav class="p-3 mb-4 bg-gray-100">
    <ol class="flex flex-wrap list-none">
      <li v-for="(crumb, index) in breadcrumbs"
          :key="index">
        <RouterLink :to="crumb.to" class="text-blue-600 hover:underline">
          {{ crumb.label }}
        </RouterLink>
        <span v-if="!crumb.isLast" class="text-gray-500 px-2">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>

</style>