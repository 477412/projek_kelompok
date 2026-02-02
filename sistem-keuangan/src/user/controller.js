const { resFailed, resSuccess } = require("../shared/helpers/payload");
const {
  findAllUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./service.js");
const bcrypt = require("bcrypt");


const getAllUser = async (req, res) => {
  try {
    const data = await findAllUser();
    return resSuccess(res, 200, "success", "Data User koperasi", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await findUserById(id);

    return resSuccess(res, 200, "success", "Data User koperasi", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const tambahUser = async (req, res) => {
  try {
    const { role, nama, password, email } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const body = {
      role,
      nama,
      password: hashedPassword,
      email,
    };

    const data = await createUser(body);

    return resSuccess(res, 200, "success", "Data berhasil ditambahkan", data);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const ubahUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, nama, password, email } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // const oldData = await findUserById(id);
    const body = {
      role,
      nama,
      password: hashedPassword,
      email,
    };

    const newData = await updateUser(id, body);

    return resSuccess(res, 200, "success", "Data berhasil diubah", body);
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

const hapusUser = async (req, res) => {
  try {
    const { id } = req.params;
    const cari = await findUserById(id);

    const data = await deleteUser(id);
    return resSuccess(res, 200, "success", "Data berhasil di hapus");
  } catch (error) {
    return resFailed(res, 500, "error", error.message);
  }
};

module.exports = {
  getAllUser,
  getUserById,
  hapusUser,
  tambahUser,
  ubahUser,
};
