const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    const h = Number(hour);

    const period = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;

    return `${formattedHour}:${minute} ${period}`;
  };

export default formatTime