<script>

export default {
  name: "Breadcrumb",
  data() {
    return {
      routeParams: {}
    }
  },
  computed: {
    breadcrumbs() {
      const route = this.$route;
      const result = [];

      let currentRoute = route;
      if (currentRoute.params) {
        Object.entries(currentRoute.params).forEach(([key, value]) => {
          if (value[0] !== ':') {
            this.routeParams[key] = value;
          }
        })
      }

      while (currentRoute) {
        if (currentRoute.meta && currentRoute.meta.breadcrumb) {

          if (currentRoute.params) {
            Object.entries(currentRoute.params).forEach((key) => {
              currentRoute.params[key] = this.routeParams[key];
            })
          }

          result.unshift({
            label: currentRoute.meta.breadcrumb,
            to: {
              name: currentRoute.name,
              params: {
                ...currentRoute.params,
              }
            },
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