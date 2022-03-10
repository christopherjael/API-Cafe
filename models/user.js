const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google_auth: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    let uid = _id;
    let orderUser = Object.assign({ uid }, user)
    return orderUser;
}

module.exports = model('User', userSchema);