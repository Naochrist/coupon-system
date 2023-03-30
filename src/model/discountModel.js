const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/dbConfig');

class DiscountModel extends Model {}

DiscountTypes.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
    },  
    type: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {sequelize, timestamps: true, modelName: "Discounts"})






module.exports = DiscountModel;