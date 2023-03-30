const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/dbConfig');




class Rules extends Model {}
Rules.init({
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
    },
    type: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {sequelize, timestamps: true, modelName: 'Rule'})






module.exports = Rules;