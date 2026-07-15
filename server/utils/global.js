function getRandomId() { return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) }

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isValidEmail(email) { return emailRegex.test(email) }

export { getRandomId, isValidEmail }