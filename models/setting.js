const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String, required:true,trim:true},
    age:{type:Number, required:true,trim:true},
    created:{type:Date, required:true,trim:true}
})

const Setting = mongoose.model('Setting', schema);
module.exports = Setting;