import {supabase} from "@/lib/supabaseClient.js";

export async function getAllRoom() {
    const {data} = await supabase.from('room').select();

    return data;
}

export async function insertExaminationRoom(examinationRoom) {
    const {data, error} = await supabase
        .from('examination_room')
        .insert(examinationRoom)
        .select()
        .single();

    if (error) console.log(error);

    return data;
}

export async function getEventRooms(eventId) {
    const {data} = await supabase.from('examination_room')
        .select()
        .eq('event', eventId);

    return data;
}