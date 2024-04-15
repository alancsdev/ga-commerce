import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      //Decoding the token, getting the properties like the jwt website
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Using -password to not get the password from the database
      // Also adding to the req.user to be used in all the website
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error('authMiddleware error: ', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
