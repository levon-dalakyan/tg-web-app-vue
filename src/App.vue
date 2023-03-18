<template>
    <div>
        <Button @click="onClose">Close</Button>
        <Button @click="onToggle">Toggle</Button>
    </div>
</template>

<script>
import Button from "./components/Button.vue";

export default {
    components: { Button },
    data() {
        return {
            isVisibleMainBtn: tg.MainButton.isVisible,
        };
    },
    methods: {
        onClose() {
            tg.close();
        },
        onToggle() {
            if (this.isVisibleMainBtn) {
                tg.MainButton.hide();
            } else {
                tg.MainButton.show();
            }
        },
    },
    watch: {},
    created() {
        console.log(tg);
    },
    mounted() {
        tg.ready();
        tg.MainButton.setParams({
            text: "Sign In",
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
