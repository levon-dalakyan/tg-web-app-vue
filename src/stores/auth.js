import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: "auth",
    persist: true,
    state: () => ({
        accessToken: null,
    }),
    getters: {
        getAccessToken: (state) => state.accessToken,
    },
    actions: {
        setAccessToken(accessToken) {
            this.accessToken = accessToken;
        },
        removeAccessToken() {
            this.accessToken = null;
        },
    },
});
