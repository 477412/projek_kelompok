const { where } = require("sequelize");
const db = require("../db/models");
const { User } = db;

const findAllUser = async () => {
  return await User.findAll();
};

const findUserById = async (id) => {
  return await User.findByPk(id);
};

const createUser = async (body) => {
  return await User.create(body);
};
const regUser = async (body) => {
  return await User.create(body);
};

const updateUser = async (id, body) => {
  return await User.update(body, { where: { id } });
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

const findByRole = async (role) => {
  return await User.findAll({ where: { role } });
};

const sortByNama = async (order) => {
  return await User.findAll({
    order: [["nama", order]],
  });
};
const sortByEmail = async (order) => {
  return await User.findAll({
    order: [["email", order]],
  });
};

module.exports = {
  findAllUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findByRole,
  sortByNama,
  sortByEmail,
  regUser,
};
