<script>
import {getEventLabel} from "@/service/listEventService.js";
import {getAllRoom, getEventRooms, insertExaminationRoom} from "@/service/listRoomService.js";
import AddForm from "@/components/AddForm.vue";
import RoomInfo from "@/components/RoomInfo.vue";

export default {
  name: "EventRoomsView",
  components: {RoomInfo, AddForm},
  props: ['id', 'ue', 'eventId'],
  data() {
    return {
      eventLabel: "",
      rooms: [],
      eventRooms: [],
    }
  },
  mounted() {
    this.loadEventDetails();
  },
  computed: {
    availableRooms() {
      return this.rooms.filter(room => !this.eventRooms.some(eventRoom => room.label === eventRoom.room));
    }
  },
  methods: {
    async loadEventDetails() {
      this.eventLabel = await getEventLabel(this.eventId);
      this.rooms = await getAllRoom();
      this.eventRooms = await getEventRooms(this.eventId);
    },
    async addRoom(newRoom) {
      console.log(newRoom);
      const toInsert = {event: this.eventId, room: newRoom};
      const inserted = await insertExaminationRoom(toInsert);
      if (inserted) {
        this.eventRooms.push(inserted);
      }
    }
  }
}
</script>

<template>
  <div>
    <h2 class="text-blue-500 text-2xl mb-6">Liste des locaux pour
      <span class="text-blue-700 font-bold uppercase">
      {{ eventLabel }} - {{ this.ue }}</span></h2>
    <div class="flex flex-wrap gap-6 m-6">
      <div v-for="examinationRoom in eventRooms" :key="examinationRoom.id">
        <RoomInfo :room="examinationRoom.room" :supervisor="examinationRoom.supervisor"/>
      </div>
    </div>

    <AddForm @add="addRoom"
             :title="'Ajouter un local'"
             :description="'Local'"
             :input-type="'select'"
             :options="availableRooms.map(room => room.label)"
    />
  </div>
</template>

<style scoped>

</style>