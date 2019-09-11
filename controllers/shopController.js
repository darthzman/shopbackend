const Shop = require('../models/shop')
const Menu = require('../models/menu')
const Config = require('../config/index')

exports.index = async (req, res, next) => {

    // const shop = await Shop.find()
    const shop = await Shop.find().select('name photo location').sort({ _id: -1 });

    const shopWithPhotoDomain = await shop.map((shop, index) => {
        return {
            id: shop._id,
            name: shop.name,
            photo: Config.DOMAIN + '/images/' + shop.photo,
            location: shop.location
        }
    });

    res.status(201).json({
        // data:req.body
        data: shopWithPhotoDomain
    });
}

exports.menu = async (req, res, next) => {
    // const menu = await Menu.find();
    // const menu = await Menu.find().select('-price +name');
    // const menu = await Menu.find().where('price').gte(500);
    // const menu = await Menu.find().where('price').lte(500);
    // const menu = await Menu.find({price: {$gte: 500}});
    const menu = await Menu.find().populate('shop', 'name location').sort({ price: -1 });

    res.status(201).json({
        status: 201,
        data: menu
    });

    // res.send('OK-menu');
}

exports.getShopWithMenu = async (req, res, next) => {
    console.log("id=" + req.params.id);

    const shopWithMenu = await Shop.findOne({ _id: req.params.id }).populate('menus');

    res.status(201).json({
        status: 201,
        data: shopWithMenu
    });

    // res.send('OK-getShopWithMenu');
}


exports.store = async (req, res, next) => {
    try {
        const shop = new Shop(req.body);
        await shop.save();

        res.status(201).json({
            message: 'save success',
            data: shop

        });

        // res.send('OK-getShopWithMenu');

    } catch (error) {
        next(error)

    }
}
