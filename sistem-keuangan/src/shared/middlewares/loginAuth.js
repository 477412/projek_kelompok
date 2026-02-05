const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../../db/models");
const { resFailed } = require("../helpers/payload");
const { User } = db;

const valLog = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return resFailed(res, 401, "error", "Email atau password salah");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return resFailed(res, 401, "error", "Email atau password salah");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  console.log(token);

  // benerin ini
  const body = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  req.user = body;
  req.token = token;


  next();
};

const authJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return resFailed(res, 401, "error", "Token kosong");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded + "kkk");
    
    if (!decoded) {
      return resFailed(res, 401, "error", "Token tidak valid");
    }
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    return resFailed(res, 500, "error", "Token kadaluarsa, harap login lagi");
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return resFailed(res, 403, "error", "Akses ditolak");
    }

    if (!roles.includes(req.user.role)) {
      return resFailed(res, 403, "error", "Anda tidak memiliki hak akses");
    }
console.log(req.user);

    next();
  };
};

module.exports = { valLog, authJwt, authorizeRole };
