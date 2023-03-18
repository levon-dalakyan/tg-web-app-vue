<template>
    <div><Button @click="onClose">Close</Button></div>
</template>

<script>
import Button from "./components/Button.vue";

export default {
    components: { Button },
    data() {
        return {
            tg: window.Telegram.WebApp,
        };
    },
    methods: {
        onClose() {
            this.tg.close();
        },
    },
    created() {
        console.log(this.tg);
    },
    mounted() {
        this.tg.ready();
        this.tg.MainButton.setParams({
            text: "Sign In",
            color: "#7000ff",
            text_color: "#fff",
            is_active: true,
            is_visible: true,
        });
    },
};
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
