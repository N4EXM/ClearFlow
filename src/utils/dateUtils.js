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

export function getCurrentDayInMonthIndex (year, month, day) {
    // return new Date(year, month, day).toLocaleDateString("en-GB", { weekday: "short" })
    return new Date(year, month, day).getDay()
}   