// index.ts
import axiosLib from "axios";
import axiosRetry from "axios-retry";
import auth from "./auth";
import bookings from "./bookings";
import rentals from "./rentals";
import rental_units from "./rental_units";
import user from "./user";
import office from "./office";
import media from "./media";
import { useAuthStore } from "../stores/auth";

const axios = axiosLib.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
});

axiosRetry(axios);

axios.interceptors.response.use(undefined, (err) => {
    const authStore = useAuthStore();

    const error = err.response;
    if (error.status === 401) {
        localStorage.setItem("auth", null);
        authStore.setAccessToken(null);
    }
});

try {
    const authPersistedState = JSON.parse(localStorage.getItem("auth"));

    if (authPersistedState?.accessToken) {
        axios.defaults.headers.common.Authorization = `Bearer ${authPersistedState?.accessToken}`;
    }
} catch {}

export default () => ({
    auth: auth({ axios }),
    bookings: bookings({ axios }),
    rentals: rentals({ axios }),
    rental_units: rental_units({ axios }),
    user: user({ axios }),
    office: office({ axios }),
    media: media({ axios }),
    setAccessToken(accessToken) {
        if (accessToken) {
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        }
    },
    removeAccessToken() {
        delete axios.defaults.headers.common.Authorization;
    },
});
