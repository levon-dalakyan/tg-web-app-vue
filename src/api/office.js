export default ({ axios }) => ({
    async getInfo(id) {
        const res = await axios.get("/office/" + id + "/info", {});

        return res?.data ?? {};
    },
    async updateInfo(id, params) {
        const res = await axios.patch("/office/" + id + "/info", params);

        return res?.data ?? {};
    },
    async updateUnit(rentalId, id, params) {
        const res = await axios.patch(
            "/office/" + rentalId + "/units/" + id + "/info",
            params
        );

        return res?.data ?? {};
    },
    async getUnits(id, offset) {
        const res = await axios.get(
            "/office/" + id + "/units?offset=" + offset,
            {}
        );

        return res?.data ?? {};
    },
    async getUnit(rentalId, id) {
        const res = await axios.get("/office/" + rentalId + "/units/" + id, {});

        return res?.data ?? {};
    },
    async createUnit(rentalId, params) {
        const res = await axios.post(
            "/office/" + rentalId + "/units/create",
            params
        );

        return res?.data ?? {};
    },
});
