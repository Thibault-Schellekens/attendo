import {supabase} from "@/lib/supabaseClient.js";

export async function getSessions() {
    const {data} = await supabase.from('session').select();
    return data;
}

export async function insertSession(session) {
    const {data, error} = await supabase.from('session').insert(session).select().single();

    if (error) console.log(error);

    return data;
}