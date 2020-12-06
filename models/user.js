const {encryptPwd} = require('../helpers/bcrypt')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.role, {through: 'models.user_role'});
      user.belongsToMany(models.access, {through: 'models.user_access'});
      user.hasMany(models.article);
    }
  };
  user.init({
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name must not be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Please use a valid email address"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password must not be empty"
        }
      }
    },
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(users){
        users.password = encryptPwd(users.password);
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};