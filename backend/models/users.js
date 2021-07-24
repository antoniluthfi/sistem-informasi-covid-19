'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      nama: DataTypes.STRING,
      role: DataTypes.STRING,
      email: DataTypes.STRING,
      nomorhp: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      daftar_vaksin: DataTypes.BOOLEAN,
      auth_token: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'users'
    }
  );
  return users;
};
