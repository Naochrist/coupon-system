const Coupon = require('../models/couponModel');
const RulesModel = require('../models/rulesModel');
const DiscountModel = require('../models/discountModel');
const sequelize = require('../config/dbConfig');




module.exports = {
    
    createCoupon: async data => { 
        try {
            const coupon = await Coupon.create(data);
            await coupon.save()
            return {
                status: coupon ? 201 : 400,
                message: coupon ? "Coupon created successfully" : "Error creating coupon",
                data: coupon
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },
    
    viewCoupons: async () => {
        try {
            const coupons = await Coupon.findAll({
                include: ['rules', 'discounts']
            });
            const length = coupons.length > 0;
            return {
                status: length ? 200 : 404,
                message: length ? "Coupons retrieved successfully" : "coupons not found",
                data: coupons
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },

   
    viewCouponById: async (id) => {
        try {
            const coupon = await Coupon.findByPk({id, include: ['rules', 'discounts']});
            return {
                status: coupon ? 200 : 400,
                message: coupon ? "Coupon retrieved successfully" : "Error retrieving coupon",
                data: coupon.toJSON()
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },

    
    viewCoupon: async (query) => {
        try {
            const coupon = await Coupon.findOne({
                where: {...query},
                include: ['rules', 'discounts']
            });
            return {
                status: coupon ? 200 : 400,
                message: coupon ? "Coupon retrieved successfully" : "Error retrieving coupon",
                data: coupon.toJSON()
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },


    addRule: async (couponData, newRuleId) => {
        try {
            const coupon = await Coupon.update({
                rules: [...couponData.rules, newRuleId]
            }, {
                where: {id: couponData.id}
            });
            return {
                status: coupon ? 200 : 400,
                message: coupon ? "Rule added successfully" : "Error adding rule",
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },

    addDiscount: async (couponData, newDiscountId) => {
        try {
            const foundCoupon = await Coupon.findOne({where: {id: couponData.id}, include: ['rules', 'discounts']});
            const coupon = await Coupon.update({
                discounts: [...foundCoupon.discounts, newDiscountId]
            }, {
                where: {id: foundCoupon.id}
            });
            return {
                status: coupon ? 200 : 400,
                message: coupon ? "Discount added successfully" : "Error adding discount",
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },

    updateCoupon: async (couponId, data) => {
        try {
            const coupon = await Coupon.update(data, {
                where: {id: couponId}
            });
            return {
                status: coupon ? 200 : 400,
                message: coupon ? "Coupon updated successfully" : "Error updating coupon",
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    }
}