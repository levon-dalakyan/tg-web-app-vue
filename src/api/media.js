export default ({ axios }) => ({
    async updateAvatar(fileName, file) {
        const url = "https://upload.uploadcare.com/base/";

        const res = await axios.post(
            url,
            {
                UPLOADCARE_PUB_KEY: import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
                UPLOADCARE_STORE: "auto",
                [fileName]: file,
                "metadata[subsystem]": "uploader",
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return res?.data ?? {};
    },
    async updateGallery(images) {
        const url = "https://upload.uploadcare.com/base/";

        const res = await axios.post(
            url,
            {
                UPLOADCARE_PUB_KEY: import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
                UPLOADCARE_STORE: "auto",
                ...images,
                "metadata[subsystem]": "uploader",
            },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return res?.data ?? {};
    },
});
