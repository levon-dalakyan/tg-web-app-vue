export default ({ axios }) => ({
    async all() {
        const res = await axios.get("/rentals", {});

        return res?.data ?? {};
    },
    async get(id) {
        const res = await axios.get("/rentals/" + id, {});

        return res?.data ?? {};
    },
    async create(params) {
        const res = await axios.post("me/rentals/create", params);

        return res?.data ?? {};
    },
    async update(id, params) {
        const res = await axios.patch("/rentals/" + id, params);

        return res?.data ?? {};
    },
    async delete(id) {
        const res = await axios.delete("/rentals/" + id, {});

        return res?.data ?? {};
    },
});
