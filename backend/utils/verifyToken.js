import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  //if no token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token available! Authentication failed!" });
  }

  //if token is available then try to verify

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ msg: "Invalid token! Authentication failed!" });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    //verification of id from token & id in params
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ msg: "User verification failed! You are not authorized!" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    //usage of next here
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ msg: "User verification failed! You are not authorized!" });
    }
  });
};
