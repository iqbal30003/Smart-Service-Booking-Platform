const jwt = require('jsonwebtoken');

function auth(required = true, requireAdmin = false) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      if (required) return res.status(401).json({ message: 'No token' });
      return next();
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      if (required) return res.status(401).json({ message: 'No token' });
      return next();
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
      req.user = payload;
      if (requireAdmin && payload.role !== 'admin') return res.status(403).json({ message: 'Admin required' });
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = auth;
