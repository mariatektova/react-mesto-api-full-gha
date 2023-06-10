const JWT_SECRET = 'some-secret-key';
const urlRegEx = /^(ftp|http|https):\/\/[^ "]+$/;

const allowedCors = [
  'https://mariatektova.students.nomoredomains.rocks',
  'https://api.mariatektova.students.nomoredomains.rocks',
  'localhost:3000',
];

module.exports = {
  urlRegEx,
  JWT_SECRET,
  allowedCors,
};
