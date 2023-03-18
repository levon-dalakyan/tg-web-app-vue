<template>
    <div>Sign In</div>
    <input type="tel" v-model="phoneNumber" />
    <Button @click="showPopupScanQr">Show Scan Qr Popup</Button>
    <div>Link Scaned: {{ qrEvent }}</div>
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
            getCodeEvent: "",
            otp_token: "",
        };
    },
    methods: {
        showPopupScanQr() {
            this.tg.showScanQrPopup({
                text: "Any text can be displayed here :)",
            });
        },
        challengePhone() {
            api()
                .auth.challenge({
                    phone_number: this.phoneNumber,
                })
                .then((res) => {
                    if (res.status == "ok" && res.token) {
                        this.otp_token = res.token;
                        this.tg.showPopup({
                            title: "Phone verification",
                            message: "Enter verification code",
                            buttons: [{ type: "close" }, { type: "ok" }],
                        });
                    }
                });
        },
    },
    watch: {
        phoneNumber(val) {
            if (val) {
                this.tg.MainButton.setParams({ text: "Get code" });
                this.tg.MainButton.show();
            }
        },
    },
    mounted() {
        this.tg.MainButton.hide();
        this.tg.onEvent("qrTextReceived", (event) => {
            this.tg.closeScanQrPopup();
            this.qrEvent = event;
        });
        this.tg.MainButton.onClick(challengePhone);
    },
};
</script>

<style lang="scss"></style>
