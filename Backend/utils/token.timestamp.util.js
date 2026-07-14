const formatLocalTimestamp = (dateInput) => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jerusalem",
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
    }).formatToParts(new Date(dateInput));

    const get = (type) => parts.find((p) => p.type === type)?.value;

    return `${get("weekday")}, ${get("day")} ${get("month")} ${get("year")} ${get("hour")}:${get("minute")}:${get("second")}`;
};

module.exports ={
    formatLocalTimestamp
}