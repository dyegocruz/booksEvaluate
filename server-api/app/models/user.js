import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import passportLocalMongoose from 'passport-local-mongoose';
import crypto from 'crypto';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateHash = (password) => {
  return crypto.createHash('sha1').update(password).digest('hex');
};

userSchema.methods.isValidPassword = (entryPassword, userPassword) => {    
    return (crypto.createHash('sha1').update(entryPassword).digest('hex') === userPassword);
};

userSchema.plugin(uniqueValidator);
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);