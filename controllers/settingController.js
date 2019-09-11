const Setting = require('../models/setting')

exports.index = async (req, res, next) => {
    
     const setting = await Setting.find()
    

     res.status(201).json({
        // data:req.body
        data:setting
    });
}
