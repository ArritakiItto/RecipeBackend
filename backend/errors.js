class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
      super(message);
      this.name = "UnauthorizedError";
      this.status = 401; // HTTP status code for Unauthorized
  }
}

module.exports = {
  UnauthorizedError
};
