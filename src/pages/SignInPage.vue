<template>
    <div>Sign In</div>
    <base-input
        class-name="style-02 size-16 phone-input"
        id="sign-in-tel"
        v-model="phoneNumber"
        input-type="tel"
        placeholder="Phone number"
        symbol="+"
        :disabled="disabledInputPhone"
    ></base-input>
    <Button @click="showPopupScanQr">Show Scan Qr Popup</Button>
    <div>Link Scaned: {{ qrEvent }}</div>
    <div>Phone: {{ phoneNumber }}</div>
</template>

<script>
import Button from "../components/Button.vue";
import BaseInput from "../components/BaseInput.vue";

export default {
    name: "SignInPage",
    components: {
        Button,
        BaseInput,
    },
    data() {
        return {
            qrEvent: "",

            // sign-in
            phoneNumber: "",
            disabledInputPhone: false,
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
