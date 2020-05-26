module.exports = (error, request, response) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  // if (process.env.NODE_ENV === 'DEV') console.error(error);
  response.status(status).send({ message });
};
