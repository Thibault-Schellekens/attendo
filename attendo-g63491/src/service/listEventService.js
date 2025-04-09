import {supabase} from "@/lib/supabaseClient.js";


export async function getAllEvent(sessionCompoId) {
    const {data} = await supabase.from('event')
        .select()
        .eq('session_compo', sessionCompoId);

    return data;
}

export async function insertEvent(event) {
    const {data, error} = await supabase.from('event').insert(event).select().single();

    if (error) console.log(error);

    return data;
}