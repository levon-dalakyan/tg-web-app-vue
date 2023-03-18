<template>
    <div>
        <Button @click="onClose">Close</Button>
        <Button @click="onToggle">Toggle</Button>
    </div>
</template>

<script>
import Button from "./components/Button.vue";

const tg = window.Telegram.WebApp;
const isVisibleMainBtn = tg.MainButton.isVisible;

tg.MainButton.setParams({
    text: "Sign In",
});
tg.MainButton.show();

export default {
    components: { Button },
    data() {
        return {
            isVisibleMainBtn: isVisibleMainBtn,
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
    watch: {
        isVisibleMainBtn(val) {
            // if (val) {
            //     this.tg?.MainButton.hide();
            // } else {
            //     this.tg?.MainButton.show();
            // }
        },
    },
    created() {
        console.log(tg);
    },
    mounted() {
        tg.ready();
        tg.MainButton.hide();
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
