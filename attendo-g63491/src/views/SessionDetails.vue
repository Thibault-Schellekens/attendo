<script>
import {getSessionUE} from '@/service/sessionDetailsService.js';
import {getSessionName} from "@/service/sessionDetailsService.js";
import {getAllUE} from "@/service/listUEService.js";
import {insertSessionUE} from "@/service/sessionDetailsService.js";

import DataTable from "@/components/DataTable.vue";
import AddForm from "@/components/AddForm.vue";

export default {
  name: "SessionDetails",
  props: ['id'],
  components: {
    AddForm,
    DataTable,
  },
  data() {
    return {
      sessionName: "",
      sessionUE: [],
      allUE: []
    }
  },
  mounted() {
    this.loadSessionDetails();
  },
  computed: {
    availableUE() {
      return this.allUE.filter(ue => !this.sessionUE.some(session => session.ue === ue.ue));
    }
  },
  methods: {
    async loadSessionDetails() {
      this.sessionUE = await getSessionUE(this.id);
      this.sessionName = await getSessionName(this.id);
      this.allUE = await getAllUE();
    },
    async addSessionUE(newUE) {
      console.log(newUE)
      if (newUE.length !== 0) {
        const inserted = await insertSessionUE({ue: newUE, session: this.id});
        if (inserted) {
          this.sessionUE.push(inserted);
        }
      }
    }
  }
}
</script>

<template>
  <div class="m-8">
    <h2 class="text-blue-500 text-2xl mb-6">Session <span class="text-blue-700 font-bold">{{ sessionName }}</span></h2>

    <DataTable :headers="['UE']" :fields="['ue']" :data-list="sessionUE">
      <template #ue="{data}">
        <RouterLink :to="{ name: 'UeEventsDetails', params: { id: this.id, ue: data.ue } }"
                    class="link-style">
          {{ data.ue }}

        </RouterLink>
      </template>
    </DataTable>

    <AddForm @add="addSessionUE" :title="'Ajouter une UE dans la session'" :description="'Ajouter'"
             :input-type="'select'" :options="availableUE.map(ue => ue.ue)"/>
  </div>

</template>

<style scoped>

</style>