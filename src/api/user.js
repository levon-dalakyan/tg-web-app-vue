import { keysToCamelCase } from "../utils/object";

export default ({ axios }) => ({
    async getMe() {
        const res = await axios.get("/me");

        return keysToCamelCase(res?.data ?? {});
    },
    async updateMe(params) {
        const res = await axios.patch("/me", params);

        return keysToCamelCase(res?.data ?? {});
    },
});
