const allowedCors = [
  'https://mariatektova.students.nomoredomains.rocks',
  'https://api.mariatektova.students.nomoredomains.rocks',
  'http://mariatektova.students.nomoredomains.rocks',
  'http://api.mariatektova.students.nomoredomains.rocks',
  'localhost:3000',
];

// eslint-disable-next-line consistent-return
export default (req, res) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
};
