
module.exports = {
    /**
     * * controller to create a new discount for a coupon
     * @param {Request} req
     */
    newDiscountForCoupon: async req => {
        try {
            if (Object.values(req.body).includes('') || Object.values(req.body).includes(' ') || !Object.keys(req.body).length) {
                return {
                    status: 400,
                    message: 'Please fill in all fields'
                }
            }
            const {body, params} = req
            const {type} = body;
            const {code} = params;
            if(!type || !code) return {status: 400, message: 'Please provide a discount type or coupon code'}
            const {status, message, data} = await couponService.viewCoupon({code});
            if(!data || status !== 200) return {status, message}
            const discountData = {
                type, couponId: data.id
            }

            const newDiscount = await discountService.createDiscount(discountData);
            if(newDiscount.status !== 201) return { status: newDiscount.status, message: newDiscount.message }
            return await couponService.addDiscount(data, newDiscount.data.id)

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `Server error: ${error.message}`
            }
        }
    }
}