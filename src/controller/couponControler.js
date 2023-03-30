
module.exports = {
    /**
     * * controller to create a new a coupon
     * @param {Request} req
     */
    newCoupon: async req => {
        try {
            if (Object.values(req.body).includes('') || Object.values(req.body).includes(' ') || !Object.keys(req.body).length) {
                return {
                    status: 400,
                    message: 'Please fill in all fields'
                }
            }
            let {type, amount, description} = req.body;
            if (!type || !amount) {
                return {
                    status: 400,
                    message: 'Please provide coupon type and amount'
                }
            }
        
            description = description || `${amount} off (${type})`
            let coupon = {
                description,
                amount_off: amount,
                percent_off: amount,
                ...req.body,
            }
            // setting rules
            if(type === "fixed") delete coupon['percent_off'];
            if(type === "percentage") delete coupon['amount_off'];
            
            // generates coupon
            const token = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const length = 6;
            codeGenerated = ''
            for (let i = 0; i <= length; i++) {
                codeGenerated += i == 3 ? '-' : token.charAt(Math.floor(Math.random() * token.length));
            }
            coupon.code = codeGenerated
        
            const {status, message, data} = await couponService.createCoupon(coupon);
            return {status, message, data}
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: `${error.message}`
            }
        }
    },
}