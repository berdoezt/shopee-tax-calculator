'use strict';
module.exports = (sequelize, DataTypes) => {
  const bill = sequelize.define('bill', {
    name: DataTypes.STRING,
    tax_code: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    state: DataTypes.INTEGER,
    created_date: DataTypes.DATE,
    updated_date: DataTypes.DATE,
  }, {
    timestamps: false
  });
  bill.associate = function(models) {
    // associations can be defined here
  };
  return bill;
};