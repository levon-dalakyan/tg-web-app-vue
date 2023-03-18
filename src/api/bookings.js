import { keysToCamelCase } from "../utils/object";

export default ({ axios }) => ({
    async all(view) {
        const res = await axios.get("/bookings?view=" + view);

        return keysToCamelCase(res?.data ?? {});
    },
    async get(id) {
        const res = await axios.get("/bookings/" + id);

        return keysToCamelCase(res?.data ?? {});
    },
    async createBooking(params) {
        const res = await axios.post("/bookings/create", params);

        return keysToCamelCase(res?.data ?? {});
    },
    async send_request(id) {
        const res = await axios.post("/bookings/" + id + "/send_request");

        return keysToCamelCase(res?.data ?? {});
    },
    async pay(id, params) {
        const res = await axios.post("/bookings/" + id + "/confirm", params);

        return keysToCamelCase(res?.data ?? {});
    },

    // rental api
    async approve_request(rental_id, id) {
        const res = await axios.post(
            "/office/" + rental_id + "/bookings/" + id + "/approve"
        );

        return keysToCamelCase(res?.data ?? {});
    },
    async decline_request(rental_id, id) {
        const res = await axios.post(
            "/office/" + rental_id + "/bookings/" + id + "/decline"
        );

        return keysToCamelCase(res?.data ?? {});
    },
    async rental_all(rental_id, view) {
        const res = await axios.get(
            "/office/" + rental_id + "/bookings?view=" + view
        );

        return keysToCamelCase(res?.data ?? {});
    },
    async rental_get(rental_id, id) {
        const res = await axios.get("/office/" + rental_id + "/bookings/" + id);

        return keysToCamelCase(res?.data ?? {});
    },

    async rental_counts(rental_id, view) {
        const res = await axios.get(
            "/office/" + rental_id + "/counts?view=" + view
        );

        return keysToCamelCase(res?.data ?? {});
    },
});
