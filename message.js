'use strict';

module.exports = function (sequelize, DataTypes) {

  const Message = sequelize.define('Message', {
    timestamp: DataTypes.BIGINT,
    content: DataTypes.TEXT
  }, {timestamps: false});
  
  return Message;
};