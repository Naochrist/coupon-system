const DiscountModel = require('../model/discountModel');
const Coupon = require('../models/couponModel');
const DiscountModel = require('../models/discountModel');
const Rules = require('../models/rulesModel');

module.exports = {
    createDiscount: async (data) => {
        try {
            const discount = await DiscountModel.create(data)
            return {
                status: discount ? 201 : 400,
                message: discount ? "Discount created successfully" : "Error creating discount",
                data: discount
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },
    viewDiscounts: async () => {
        try {
            const discounts = await DiscountModel.findAll();
            const length = discounts.length > 0;
            return {
                status: length ? 200 : 404,
                message: length ? "Discounts retrieved successfully" : "Not discounts found",
                data: discounts
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },

    viewDiscountById: async (id) => {
        try {
            const discount = await DiscountModel.findByPk(id);
            return {
                status: discount ? 200 : 404,
                message: discount ? "Discount retrieved successfully" : `No discount with id: ${id} found`,
                data: discount
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },



    viewDiscountByType: async (type) => {
        try {
            const discount = await DiscountModel.findOne({
                where: { type }
            });
            return {
                status: discount ? 200 : 404,
                message: discount ? "Discount retrieved successfully" : `No discount with type: ${type} found`,
                data: discount
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    },
   
    
    updateDiscount: async (data, discountId) => {
        try {
            const discount = await Coupon.update({couponId: data}, {
                where: {id: discountId}
            });
            return {
                status: discount ? 200 : 400,
                message: discount ? "discount updated successfully" : "Error updating discount",
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