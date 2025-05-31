const { getUser } = require('../service/auth');
const cors = require('cors');

function checkforAuth(req, res, next) {
    const tokenCookie = req.cookies?.uid;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }

    const user = getUser(tokenCookie);
    req.user = user;
    next();
}

function restrictTo(roles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'You are not logged in' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'You are not allowed to access this route' });
        }
        return next();
    };
}

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        return res.status(401).json({ error: 'You are not logged in' });
    }
    const user = getUser(userUid);
    if (!user) {
        return res.status(401).json({ error: 'Invalid user' });
    }
    req.user = user;
    next();
}

module.exports = {
    checkforAuth,
    restrictTo,
    restrictToLoggedinUserOnly
};