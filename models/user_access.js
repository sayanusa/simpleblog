'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_access extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_access.belongsTo(models.user);
      user_access.belongsTo(models.access);
    }
  };
  user_access.init({
    userId: DataTypes.INTEGER,
    accessId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_access',
  });
  return user_access;
};