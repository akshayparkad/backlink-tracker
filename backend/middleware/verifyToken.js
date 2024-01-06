const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized - Token has expired' });
            } else {
                console.error('Error verifying token:', err.message);
                return res.status(401).json({ error: 'Unauthorized - Invalid token' });
            }
        }

        // Attach the decoded user information to the request object for use in route handlers
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
