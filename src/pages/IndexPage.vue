<template>
    <div>
        <Button @click="onClose">Close</Button>
        <Button @click="redirectSignIn">Sign In</Button>
    </div>
</template>

<script>
import Button from "../components/Button.vue";

export default {
    name: "IndexPage",
    components: { Button },
    data() {
        return {};
    },
    methods: {
        onClose() {
            this.tg.close();
        },
        redirectSignIn() {
            this.$router.push({ name: "sign-in-page" });
        },
    },
    watch: {},
    created() {
        console.log(this.tg);
    },
    mounted() {
        this.tg.MainButton.setParams({
            text: "Sign In",
            is_visible: true,
        });
        this.tg.MainButton.onClick(this.redirectSignIn);
    },
};
</script>

<style scoped></style>
