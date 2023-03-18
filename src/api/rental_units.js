export default ({ axios }) => ({
    async all(rental_id, offset) {
        const res = await axios.get(
            "/rentals/" + rental_id + "/units?offset=" + offset,
            {}
        );

        return res?.data ?? {};
    },
    async filtered(rental_id, params) {
        const res = await axios.get("/rentals/" + rental_id + "/units", params);

        return res?.data ?? {};
    },
    async get(id) {
        const res = await axios.get("/units/" + id);

        return res?.data ?? {};
    },

    async price(id, params) {
        const res = await axios.get(
            "/units/" +
                id +
                "/price?start=" +
                params.start +
                "&end=" +
                params.end
        );

        return res?.data ?? {};
    },

    async save(rental_id, id, params) {
        const res = await axios.patch(
            "/rentals/" + rental_id + "/units/" + id,
            params
        );

        return res?.data ?? {};
    },
});
