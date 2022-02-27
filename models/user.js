const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    mail: {
        type: String,
        required: [true, 'Mail is required'],
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

module.exports = model('User', userSchema);