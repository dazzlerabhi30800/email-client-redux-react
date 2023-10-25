export function localTime(time) {
    let date = new Date(time);
    let getYear = date.getFullYear();
    let month = date.getMonth();
    let weekDay = date.getDay();
    let weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let fullDate = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let convertedHours = hours === 12 ? hours : hours % 12;
    return `${fullDate}/${month < 10 ? "0" + month : month}/${getYear} ${weeks[weekDay - 1]} ${convertedHours < 10 ? "0" + convertedHours : convertedHours}:${minutes} ${hours < 12 ? "am" : "pm"}`;
}