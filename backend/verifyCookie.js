const jwt = require("jsonwebtoken")

const verifyCookie = async (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = await jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyCookie