export const convertEpochToDate = (epochTime) => {
    const date = new Date(epochTime * 1000);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    return month + "/" + day + "/" + year;
};
