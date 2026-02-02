const express = require("express");
const {
  getAllTransaksi,
  getTransaksiById,
  createTransaksi,
  removeTransaksi,
  changeDataTransaksi,
  nominalAllTransaksi,
} = require("./controller");
const router = express.Router();
const upload = require("../shared/middlewares/upload.js");
const {
  cekIdTransaksi,
  cekBodyTransaksi,
} = require("../shared/middlewares/valTransaksi.js");
const {
  authJwt,
  authorizeRole,
} = require("../shared/middlewares/loginAuth.js");

router.get(
  "/bendahara/alldata",
  authJwt,
  authorizeRole("bendahara"),
  getAllTransaksi,
);
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

router.get("/total/dana", nominalAllTransaksi);

module.exports = router;
