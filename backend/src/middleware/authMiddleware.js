const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Development Bypass Handling
      if (decoded.userId === 'dev_user_id') {
        req.user = {
          _id: 'dev_user_id',
          name: 'Developer Admin',
          email: 'admin@prithvinet.gov.in',
          role: 'Admin'
        };
      } else {
        req.user = await User.findById(decoded.userId).select('-password');
      }
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.warn('Auth Failure: Token expired');
        return res.status(401).json({ message: 'Token expired' });
      }
      if (error.name === 'JsonWebTokenError') {
        console.warn('Auth Failure: Malformed or invalid signature');
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.error('Auth Middleware Error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role ${req.user ? req.user.role : 'Guest'} is not authorized to access this route` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
