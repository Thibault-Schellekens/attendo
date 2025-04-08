import {defineStore} from "pinia";
import {supabase} from "@/lib/supabaseClient.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({user: null}),
    getters: {
        isConnected() {
            return this.user !== null;
        }
    },
    actions: {
        async init() {
            const {data: {session}} = await supabase.auth.getSession();
            if (session) {
                this.user = session.user;
            }

            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    this.user = session.user;
                } else if (event === 'SIGNED_OUT') {
                    this.user = null;
                }
            });
        },
        async loginWithGoogle() {
            const {user, session, error} = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.href
                }
            });
            this.user = user;
        },
        async logout() {
            await supabase.auth.signOut();
            this.user = null;
        }
    }
})