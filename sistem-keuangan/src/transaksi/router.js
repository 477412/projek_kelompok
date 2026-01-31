const express = require("express");
const {
  getAllTransaksi,
  getTransaksiById,
  createTransaksi,
  removeTransaksi,
  changeDataTransaksi,
} = require("./controller");
const router = express.Router();
const upload = require("../shared/middlewares/upload.js");
const {
  cekIdTransaksi,
  cekBodyTransaksi,
} = require("../shared/middlewares/valTransaksi.js");

router.get("/", getAllTransaksi);
router.get("/cari/:id", cekIdTransaksi, getTransaksiById);
router.post(
  "/tambah",
  upload.single("bukti_transaksi"),
  cekBodyTransaksi,
  createTransaksi,
);
router.delete("/hapus/:id", cekIdTransaksi, removeTransaksi);
router.patch(
  "/ubah/:id",
  cekIdTransaksi,
  upload.single("bukti_transaksi"),
  cekBodyTransaksi,
  changeDataTransaksi,
);

module.exports = router;
