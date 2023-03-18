import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "user",
    persist: true,
    state: () => ({
        user: null,
        userAvatar: null,
    }),
    getters: {
        getUser: (state) => state.user,
        getUserAvatar: (state) => state.userAvatar,
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        removeUser() {
            this.user = null;
        },
        setUserAvatar(avatar) {
            this.userAvatar = avatar;
        },
        removeUserAvatar() {
            this.userAvatar = null;
        },
    },
});
