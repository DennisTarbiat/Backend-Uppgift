const hemligNyckel = "metin";

exports.authenticate = (req, res, next) => {
  if (req.headers.authtoken != hemligNyckel) {
    return res.sendStatus(401);
  }
  next();
};
