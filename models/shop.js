const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    photo: { type: String },
    location: {
        lat: { type: Number },
        lgn: { type: Number }
    }
}, {
    timestamps: true,
    collection: 'shops',//collection name from mongo
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

});

schema.virtual('menus', {
    ref: 'Menu',
    localField: '_id',
    foreignField: 'shop'
})

const Shop = mongoose.model('Shop', schema);
module.exports = Shop; 