import { defineStore } from "pinia";

export const useBookingStore = defineStore({
    id: "booking",
    persist: true,
    state: () => ({
        reqBookingsAmount: 0,
    }),
    getters: {
        getReqBookingsAmount: (state) => state.reqBookingsAmount,
    },
    actions: {
        setReqBookingsAmount(amount) {
            this.reqBookingsAmount = amount;
        },
    },
});
