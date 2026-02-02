const { where } = require("sequelize");
const db = require("../db/models");
const { User } = db;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const findAllUser = async () => {
  return await User.findAll();
};

const findUserById = async (id) => {
  return await User.findByPk(id);
};
const createUser = async (body) => {
  return await User.create(body);
};
const updateUser = async (id, body) => {
  return await User.update(body, { where: { id } });
};
const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

module.exports = {
  findAllUser,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
