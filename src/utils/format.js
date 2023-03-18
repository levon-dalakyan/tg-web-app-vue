export function formatDate(d) {
    const date = new Date(d);
    return date
        .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
        })
        .replace(/,/, "");
}
