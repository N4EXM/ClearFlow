// utils/dateUtils.js
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getCurrentMonth() {
    return new Date().getMonth()
}

export function getCurrentYear() {
    return new Date().getFullYear()
}

export function getCurrentDate() {
    return new Date().getDate()
}

export function getDateInDMY_Format(currentYear, currentMonth, currentDay) {
    const date = new Date(currentYear, currentMonth, currentDay)

    // Extract day, month, and year
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Format the date as dd/mm/yyyy
    return `${day}/${month}/${year}`;

}

export function getDateInYMD_Format(currentYear, currentMonth, currentDay) {
    const date = new Date(currentYear, currentMonth, currentDay)

    // Extract day, month, and year
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Format the date as dd/mm/yyyy
    return `${year}/${month}/${day}`;

}

export function getCurrentDayInMonthIndex (year, month, day) {
    // return new Date(year, month, day).toLocaleDateString("en-GB", { weekday: "short" })
    return new Date(year, month, day).getDay()
}   