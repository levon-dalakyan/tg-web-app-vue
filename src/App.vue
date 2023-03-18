<template>
    <div>
        <Button @click="onClose">Close</Button>
    </div>
</template>

<script>
import Button from "./components/Button.vue";

export default {
    components: { Button },
    data() {
        return {};
    },
    methods: {
        onClose() {
            this.tg.close();
        },
    },
    watch: {},
    created() {
        console.log(this.tg);
    },
    mounted() {
        this.tg.ready();
        this.tg.MainButton.setParams({
            text: "Sign In",
            is_visible: true,
        });
    },
};
</script>

<style scoped></style>
