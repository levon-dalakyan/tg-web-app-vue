import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.tg = window.Telegram.WebApp;
app.mount("#app");
