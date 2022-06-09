const nameValidator = (name) => name.length >= 5;
const dobValidator = (birthDate) => /^\d{4}-\d{2}-\d{2}$/.test(birthDate);
const nonEmpty = (text) => text.length > 0;

module.exports = { nameValidator, dobValidator, nonEmpty };
