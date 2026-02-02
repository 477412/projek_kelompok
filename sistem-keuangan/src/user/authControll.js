const { resFailed, resSuccess } = require("../shared/helpers/payload");

const loginAuth = async (req, res) => {
  try {
    const data = {
      token: req.token,
      user: {
        id: req.user.id,
        email: req.user.email,
      },
    };
    return resSuccess(res, 200, "success", "Berhasil login", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = { loginAuth };
