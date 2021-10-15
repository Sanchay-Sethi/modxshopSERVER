const jwt = require('jsonwebtoken');

//MiddleWares

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    console.log("auth" + authHeader)
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) res.status(403).json("Token is not valid");
        console.log(err)
        req.user = user;
        next();
      });
    } else {
      // console.log(res)
      return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
};

module.exports = {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin}