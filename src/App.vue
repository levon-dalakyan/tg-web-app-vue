<script>
import { RouterView } from "vue-router";

export default {
    mounted() {
        this.tg.ready();
    },
};
</script>

<template>
    <RouterView />
</template>

<style scoped>
@import "./assets/base.css";
</style>
