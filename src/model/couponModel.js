const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/dbConfig');

class Coupon extends Model {}

Coupon.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    }, 
    description: {
        type: DataTypes.TEXT,
    }, 
    currency: {
        type: DataTypes.TEXT,
        defaultValue: 'USD',
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }, 
    amount_off: {
        type: DataTypes.DOUBLE(10, 2),
        defaultValue: null
    }, 
    percent_off: {
        type: DataTypes.DOUBLE(10, 2),
        defaultValue: null
    }, 
    
}, {sequelize, timestamps: true, modelName: 'Coupon'});

module.exports = Coupon;