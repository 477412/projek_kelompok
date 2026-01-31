const { resFailed, resSuccess } = require("../shared/helpers/payload");
const { findAllTransaksi } = require("./service.js");

const getAllTransaksi = async (req, res) => {
  try {
    const data = await findAllTransaksi();
    return resSuccess(res, 200, "success", "Data transaksi koperasi", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  getAllTransaksi,
};
