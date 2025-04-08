<script>
import {getSessions} from "@/service/listSessionsService.js";
import {insertSession} from "@/service/listSessionsService.js";

import DataTable from "@/components/DataTable.vue";
import AddForm from "@/components/AddForm.vue";

export default {
  name: "SessionView",
  components: {
    DataTable,
    AddForm,
  },
  data() {
    return {
      sessions: [],
    }
  },
  mounted() {
    this.loadSessions();
  },
  methods: {
    async loadSessions() {
      this.sessions = await getSessions();
    },
    async addSession(newSession) {
      if (newSession.length !== 0) {
        const inserted = await insertSession({label: newSession});
        if (inserted) {
          this.sessions.push(inserted[0]);
          console.log(inserted[0])
        }
      }
    }
  }
}

</script>

<template>
  <div class="m-8">
    <h2 class="text-purple-700 font-bold text-2xl mb-6">Session</h2>

    <DataTable :headers="['Sessions']" :fields="['label']" :data-list="sessions"/>

    <AddForm :title="'Ajouter une session'" :description="'Nouvelle session'" @add="addSession"/>
  </div>
</template>
