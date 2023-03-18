export default ({ axios }) => ({
    async challenge({ phone_number: phone_number }) {
        const res = await axios.post("/login/otp/challenge", {
            phone_number: phone_number,
        });

        return res?.data ?? {};
    },
    async verify({ otp_token: otp_token, otp: otp }) {
        const res = await axios.post("/login/otp/verify", {
            otp_token: otp_token,
            otp: otp,
        });

        return res?.data ?? {};
    },
    async challengeEmail({ otp_token: otp_token, email: email }) {
        const res = await axios.post("/signup/set_email/challenge", {
            otp_token: otp_token,
            email: email,
        });

        return res?.data ?? {};
    },
    async verifyEmail({ otp_token: otp_token, otp: otp }) {
        const res = await axios.post("/signup/set_email/verify", {
            otp_token: otp_token,
            otp: otp,
        });

        return res?.data ?? {};
    },
    async completeSignup(params) {
        const res = await axios.post("/signup/complete", params);

        return res?.data ?? {};
    },
});
