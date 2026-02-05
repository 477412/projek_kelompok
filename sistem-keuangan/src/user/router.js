const express = require("express");
const {
  getAllUser,
  getUserById,
  hapusUser,
  tambahUser,
  ubahUser,
  cariByRole,
  urutBynama,
  urutByEmail,
  regisUser,
} = require("./controller.js");
const {
  cekId,
  cekTambah,
  cekUpdate,
  cekRole,
  cekSort,
  cekReg,
  cekHapus,
} = require("../shared/middlewares/valUser.js");
const router = express.Router();
const upload = require("../shared/middlewares/upload.js");
const { loginAuth } = require("./authControll.js");
const {
  valLog,
  authJwt,
  authorizeRole,
} = require("../shared/middlewares/loginAuth.js");

router.get(
  "/bendahara/alldata",
  authJwt,
  authorizeRole("bendahara"),
  getAllUser,
);

router.get(
  "/cari/:id",
  authJwt,
  authorizeRole("bendahara"),
  cekId,
  getUserById,
);
router.delete(
  "/hapus/:id",
  authJwt,
  authorizeRole("anggota", "bendahara"),
  cekHapus,
  hapusUser,
);

router.post(
  "/tambah",
  authJwt,
  authorizeRole("bendahara"),
  upload.none(),
  cekTambah,
  tambahUser,
);

router.patch(
  "/ubah/:id",
  authJwt,
  authorizeRole("bendahara"),
  upload.none(),
  cekUpdate,
  ubahUser,
);

router.post("/auth/login", valLog, loginAuth);

router.get("/search", authJwt, authorizeRole("bendahara"), cekRole, cariByRole);

router.get(
  "/sort/nama",
  authJwt,
  authorizeRole("bendahara"),
  cekSort,
  urutBynama,
);

router.get(
  "/sort/email",
  authJwt,
  authorizeRole("bendahara"),
  cekSort,
  urutByEmail,
);

router.post(
  "/regis",
  upload.none(),
  cekReg,
  regisUser,
);

module.exports = router;
