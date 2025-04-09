import {supabase} from "@/lib/supabaseClient.js";

export async function getAllUE() {
    const {data} = await supabase.from('ue').select();
    return data;
}