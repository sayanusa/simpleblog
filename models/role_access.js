'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role_access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  role_access.init({
    roleId: DataTypes.INTEGER,
    accessId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role_access',
  });
  return role_access;
};