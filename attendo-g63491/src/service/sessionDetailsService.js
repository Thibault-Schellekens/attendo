import {supabase} from "@/lib/supabaseClient.js";

export async function getSessionName(sessionId) {
    const {data} = await supabase.from('session')
        .select('label')
        .eq('id', sessionId)
        .single();
    return data.label;
}

export async function getSessionUE(sessionId) {
    const {data} = await supabase.from('session_compo')
        .select()
        .eq('session', sessionId);

    return data;
}

export async function insertSessionUE(sessionUE) {
    const {data, error} = await supabase.from('session_compo').insert(sessionUE).select().single();

    if (error) console.log(error);

    return data;
}

export async function getSessionCompoId(sessionId, ue) {
    const {data} = await supabase.from('session_compo')
        .select('id')
        .eq('session', sessionId)
        .eq('ue', ue)
        .single();

    console.log(data.id)
    return data.id;
}