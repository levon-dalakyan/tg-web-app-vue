import { defineStore } from "pinia";

export const useRentalStore = defineStore({
    id: "rental",
    persist: true,
    state: () => ({
        rental: null,
        rentalRange: null,
    }),
    getters: {
        getRental: (state) => state.rental,
        getRentalRange: (state) => state.rentalRange,
    },
    actions: {
        setRental(rental) {
            this.rental = rental;
        },
        removeRental() {
            this.rental = null;
        },
        setRentalRange(range) {
            this.rentalRange = range;
        },
    },
});
