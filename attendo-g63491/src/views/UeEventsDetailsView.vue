<script>
import EventInfo from "@/components/EventInfo.vue";

import {getSessionCompoId, getSessionName} from "@/service/sessionDetailsService.js";
import {getAllEvent} from "@/service/listEventService.js";
import {insertEvent} from "@/service/listEventService.js";

import AddForm from "@/components/AddForm.vue";

export default {
  name: "UeEventsDetailsView",
  props: ['id', 'ue'],
  components: {
    AddForm,
    EventInfo
  },
  data() {
    return {
      sessionName: "",
      sessionCompoId: null,
      events: []
    }
  },
  mounted() {
    this.loadUEDetails();
  },
  methods: {
    async loadUEDetails() {
      this.sessionName = await getSessionName(this.id);
      this.sessionCompoId = await getSessionCompoId(this.id, this.ue);
      this.events = await getAllEvent(this.sessionCompoId);
    },
    async addEvent(newEvent) {
      const toInsert = {session_compo: this.sessionCompoId, label: newEvent};
      const inserted = await insertEvent(toInsert);
      if (inserted) {
        this.events.push(inserted);
      }
    }
  }
}
</script>

<template>
  <div>
    <h2 class="text-blue-500 text-2xl mb-6">Liste des épreuves de
      <span class="text-blue-700 font-bold">
      {{ this.ue }}</span> (session {{ sessionName }})</h2>
    <div class="flex flex-wrap gap-6 m-6">
      <EventInfo v-for="event in events" :key="event.id" :title="event.label"/>
    </div>

    <AddForm @add="addEvent" :title="'Ajouter une épreuve'" :description="'Intitulé'"
             placeholder="bilan, projet, examen..." :button-text="'Créer'"/>
  </div>
</template>


<style scoped>

</style>