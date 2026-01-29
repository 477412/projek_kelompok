const resSuccess = (res, code, status, message, data = null) => {
  return res.status(code).json({ status, message, data });
};

const resFailed = (res, code, status, message) => {
  return res.status(code).json({ status, message });
};

module.exports = {
  resSuccess,
  resFailed,
};
