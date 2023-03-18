<template>
    <div>Sign In</div>
    <input type="text" />
    <input type="text" />
    <Button @click="showPopupScanQr">Show Scan Qr Popup</Button>
    {{ qrEvent }}
</template>

<script>
import Button from "../components/Button.vue";

export default {
    name: "SignInPage",
    components: {
        Button,
    },
    data() {
        return {
            qrEvent: "",
        };
    },
    methods: {
        showPopupScanQr() {
            this.tg.showScanQrPopup({
                text: "Any text can be displayed here :)",
            });
        },
    },
    mounted() {
        this.tg.MainButton.hide();
        this.tg.onEvent("qrTextReceived", (event) => {
            this.tg.closeScanQrPopup();
            this.qrEvent = event;
        });
    },
};
</script>

<style lang="scss"></style>
