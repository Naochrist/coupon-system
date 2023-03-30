
const syncDB = async (sequelizeInstance) => {
    Coupon.hasMany(Rules, {as: 'rules', foreignKey: 'couponId'});
    Rules.belongsTo(Coupon, {as: 'coupon'});
    Coupon.hasMany(DiscountTypes, {as: 'discounts', foreignKey: 'couponId'});
    DiscountTypes.belongsTo(Coupon, {as: 'coupon'});

    await sequelizeInstance.sync({force:true});
}

module.exports = syncDB;