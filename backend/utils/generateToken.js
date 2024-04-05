import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    //HTTP-only cookie is a type of cookie that can be set by a web server
    // with a special flag that prevents it from being accessed through
    // client-side scripts like JavaScript.
    httpOnly: true,

    // The secure property in the res.cookie() method is a Boolean value that
    // determines whether the browser should only send the cookie over HTTPS connections.
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production

    // The sameSite attribute set to 'strict' in the res.cookie() method indicates
    // that the cookie should only be sent to the same site from where it originated
    // preventing CSRF attacks
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
