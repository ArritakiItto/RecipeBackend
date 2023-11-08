const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../errors");

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, JWT_SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next(new UnauthorizedError("Invalid token"));
    }
}

function ensureLoggedIn(req, res, next) {
    if (!res.locals.user) {
        return next(new UnauthorizedError("You must be logged in"));
    }
    return next();
}

function ensureAdmin(req, res, next) {
    if (!res.locals.user || !res.locals.user.isAdmin) {
        return next(new UnauthorizedError("Admin privileges required"));
    }
    return next();
}

function ensureCorrectUserOrAdmin(req, res, next) {
    const user = res.locals.user;
    if (!(user && (user.isAdmin || user.username === req.params.username))) {
        return next(new UnauthorizedError("Access denied"));
    }
    return next();
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin,
};
