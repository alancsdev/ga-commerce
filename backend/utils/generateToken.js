import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;

//The sameSite attribute set to 'strict' in the res.cookie()
// method indicates that the cookie should only be sent to the
// same site from where it originated. This means the cookie
// will not be sent in cross-site navigation requests,
// helping prevent Cross-Site Request Forgery (CSRF) attacks.
