const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
    role:{type:String, required:true,trim:true},
    name:{type:String, required:true,trim:true},
    email:{type:String, required:true,trim:true, unique:true},
    password:{type:String, required:true,trim:true}
})

schema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

schema.methods.validPassword = async function (password) {
    console.log('compare ' + password + '|' + this.password);
    
    const isLogin = await bcrypt.compare(password, this.password);

    console.log('isLogin ' + isLogin );

    return isLogin;
}

const User = mongoose.model('User', schema);
module.exports = User;