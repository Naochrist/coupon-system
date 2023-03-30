const {Sequelize} = require('sequelize');
require('dotenv').config();

const user = "";
const password = "";
const host = "";
const port = 54;
const database = "coupon-sysDb";

const sequelize = new Sequelize(database, user, password,
    {
        host,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        dialect:'postgres'
    
    }
);
module.exports = sequelize;