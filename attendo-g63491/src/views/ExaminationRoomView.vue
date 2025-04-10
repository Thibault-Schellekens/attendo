<script>
import {
  deleteStudentFromExam, getAllStudendIdFromExam,
  getAllStudents,
  getAllTeacherAcro,
  getExamRoom,
  getStudentName, getStudentId, insertStudentToExam,
  updateTeacher
} from "@/service/listExamRoomService.js";
import AddForm from "@/components/AddForm.vue";
import DataTable from "@/components/DataTable.vue";

export default {
  name: "ExaminationRoomView",
  components: {DataTable, AddForm},
  props: ['id', 'ue', 'eventId', 'examRoomId'],
  data() {
    return {
      room: "",
      supervisor: "",
      teachers: [],
      students: [],
      selectedRows: []
    }
  },
  mounted() {
    this.loadExamRoomDetails();
  },
  computed: {
    availableTeachers() {
      return this.teachers.filter(teacher => teacher !== this.supervisor);
    }
  },
  methods: {
    async loadExamRoomDetails() {
      const [examRoom, teachers] = await Promise.all([
        getExamRoom(this.examRoomId),
        getAllTeacherAcro()
      ])

      this.room = examRoom.room;
      this.supervisor = examRoom.supervisor;
      this.teachers = teachers;

      await this.buildStudents();
    },
    async buildStudents() {
      const students = await getAllStudents(this.ue);

      const names = await Promise.all(
          students.map(student => getStudentName(student.student_id))
      );

      this.students = students.map((student, index) => ({
        ...student,
        firstname: names[index].firstname,
        lastname: names[index].lastname
      }));

      await this.buildSelectedRows();
    },
    addSupervisor(newSupervisor) {
      const updated = updateTeacher(this.examRoomId, newSupervisor);
      if (updated) {
        this.supervisor = newSupervisor;
      }
    },
    onRowClick(data, index) {
      console.log(data, index);
      if (this.selectedRows.includes(index)) {
        this.selectedRows.splice(this.selectedRows.indexOf(index), 1);
        deleteStudentFromExam(data.student_id, this.examRoomId);
      } else {
        this.selectedRows.push(index);
        insertStudentToExam(data.student_id, this.examRoomId);
      }
    },
    async buildSelectedRows() {
      const selectedIds = await getAllStudendIdFromExam(this.examRoomId);
      selectedIds.forEach(studentId => {
        const row = this.students.findIndex(student => student.student_id === studentId);
        this.selectedRows.push(row);
      });
    }
  }
}
</script>

<template>
  <div>
    <h2 class="text-blue-500 text-2xl mb-6">Prise de présence du local {{ room }} par {{ supervisor }}</h2>
    <AddForm @add="addSupervisor"
             :title="'Choisir/Modifier le surveillant'"
             :description="'Surveillant'"
             :input-type="'select'"
             :options="availableTeachers"
             :button-text="'Définir le surveillant'"/>

    <DataTable
        @row-click="onRowClick"
        :headers="['matricule', 'group', 'nom', 'prénom']"
        :fields="['student_id', 'group', 'lastname', 'firstname']"
        :data-list="students"
        :selected-rows="selectedRows"
        class="mt-6"/>
  </div>

</template>

<style scoped>

</style>