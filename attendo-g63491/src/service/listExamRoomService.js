import {supabase} from "@/lib/supabaseClient.js";

export async function getExamRoom(examRoomId) {
    const {data} = await supabase.from('examination_room')
        .select()
        .eq('id', examRoomId)
        .single();
    return data
}

export async function getAllTeacherAcro() {
    const {data} = await supabase.from('teacher').select('acro');

    return data.map(teacher => teacher.acro);
}

export async function updateTeacher(examRoomId, supervisor) {
    const {data} = await supabase
        .from('examination_room')
        .update({'supervisor': supervisor})
        .eq('id', examRoomId)
        .select('supervisor')
        .single();
    return data;
}

export async function getAllStudents(ue) {
    const {data} = await supabase
        .from('pae')
        .select()
        .eq('ue', ue);

    return data;
}

export async function getStudentName(studentId) {
    const {data} = await supabase
        .from('student')
        .select('firstname, lastname')
        .eq('student_id', studentId)
        .single();

    return data;
}

export async function getStudentId(studentId) {
    console.log(studentId);
    const {data} = await supabase
        .from('pae')
        .select('id')
        .eq('student_id', studentId)
        .single()
    console.log("data", data);
    return data.id;
}

export async function insertStudentToExam(studentId, examRoomId) {
    const {data} = await supabase
        .from('examination')
        .insert({student: studentId, examination_room: examRoomId})
        .select()
        .single();

    return data;
}

export async function deleteStudentFromExam(studentId, examRoomId) {
    const {data} = await supabase
        .from('examination')
        .delete()
        .eq('student', studentId)
        .eq('examination_room', examRoomId);
}

export async function getAllStudendIdFromExam(examRoomId) {
    const {data} = await supabase
        .from('examination')
        .select('student')
        .eq('examination_room', examRoomId);

    return data.map(student => student.student);
}