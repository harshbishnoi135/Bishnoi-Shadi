const notFound = (req, res, next) => { // it will check all the routes and if it does not match any of them, it will go to this middleware
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

const errorHandlerr = (err, req, res, next) => { // this middleware will handle all the errors
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? ':)' : err.stack,
  });
}

export { notFound, errorHandlerr };