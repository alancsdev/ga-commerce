//This will be called if no other middleware has handled the request and it will create a new error object and set the code 404
const notFound = (req, res, next) => {
  // Create a new error object with a descriptive message including the requested URL
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  // Pass the error object to the next middleware
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    // Set a more user-friendly message for bad ObjectId errors
    message = `Resource not found`;
    statusCode = 404;
  }
  // Send response with appropriate status code and error message
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };
