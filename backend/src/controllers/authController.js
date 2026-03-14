const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (or Admin restricted depending on role)
const registerUser = async (req, res) => {
  const { name, email, password, role, region, officeId } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    region,
    officeId
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user)
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  // Development Bypass for testing without MongoDB
  if (email === 'admin@prithvinet.gov.in' && password === 'admin123') {
    if (role && role !== 'Admin') {
      return res.status(401).json({ message: 'Account not authorized for this role' });
    }
    const devUser = {
      _id: 'dev_user_id',
      name: 'Developer Admin',
      email: 'admin@prithvinet.gov.in',
      role: 'Admin'
    };
    return res.json({
      _id: devUser._id,
      name: devUser.name,
      email: devUser.email,
      role: devUser.role,
      accessToken: generateAccessToken(devUser),
      refreshToken: generateRefreshToken(devUser)
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Role-based validation
      if (role && user.role !== role) {
        return res.status(401).json({ message: `Access denied. Authorized role: ${user.role}` });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error (Database might be disconnected). Use dev credentials: admin@prithvinet.gov.in / admin123' });
  }
};


// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    let user;
    if (decoded.userId === 'dev_user_id') {
      user = {
        _id: 'dev_user_id',
        name: 'Developer Admin',
        email: 'admin@prithvinet.gov.in',
        role: 'Admin'
      };
    } else {
      user = await User.findById(decoded.userId);
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

module.exports = { registerUser, loginUser, refreshAccessToken };
