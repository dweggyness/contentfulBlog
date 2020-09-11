// Converts date object into format DD.MM.YY
// always 2 digits

export function formatDate(dateObj) {
    if (!(dateObj instanceof Date)) return `A date object should be passed into formatDate(). You passed: ${dateObj}`;
    const Day = ("0" + dateObj.getDate()).slice(-2)
    const Month = ("0" + dateObj.getMonth()).slice(-2)
    const Year = ((dateObj.getFullYear()).toString()).slice(-2)

    return (`${Day}.${Month}.${Year}`)
}
