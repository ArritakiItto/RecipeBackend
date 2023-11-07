const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
} = require("./auth");
const { UnauthorizedError } = require("../errors");

describe("JWT Middleware", () => {

  test("authenticateJWT: valid token", () => {
    const req = {
      headers: {
        authorization: "Bearer " + jwt.sign({ username: "testuser", isAdmin: false }, JWT_SECRET_KEY)
      }
    };
    const res = { locals: {} };
    const next = jest.fn();

    authenticateJWT(req, res, next);

    // Check properties individually
    expect(res.locals.user.username).toEqual("testuser");
    expect(res.locals.user.isAdmin).toEqual(false);
    expect(next).toHaveBeenCalled();
  });

  test("authenticateJWT: invalid token", () => {
    const req = {
      headers: {
        authorization: "Bearer invalidtoken"
      }
    };
    const res = { locals: {} };
    const next = jest.fn();

    authenticateJWT(req, res, next);
    expect(res.locals.user).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  // Additional tests for ensureLoggedIn, ensureAdmin, and ensureCorrectUserOrAdmin can be added similarly.

});

