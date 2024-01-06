const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const token = req.headers.authorization;

  console.log(token);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if (err) {
        console.log(err);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    // Attach the decoded user information to the request object for use in route handlers
    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;
