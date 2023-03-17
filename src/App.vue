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
