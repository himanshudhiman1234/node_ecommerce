const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.jwt; // Extract token from cookie
  if (!token) {
    return res.redirect('/login');
  }
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.redirect('/login');
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
