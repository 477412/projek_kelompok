"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaksi.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Transaksi.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nominal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pemasukan", "pengeluaran"),
        allowNull: false,
      },
      bukti_transaksi: {
        type: DataTypes.STRING,
      },
      tgl: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Transaksi",
      tableName: "transaksi",
    },
  );
  return Transaksi;
};
