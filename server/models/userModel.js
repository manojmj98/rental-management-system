const mongoose = require("mongoose");
const { ROLE, EMAIL_PROVIDER, SECURITY_QUESTIONS } = require('../constants/constants.js');

const questionSchema =  mongoose.Schema({ question: String, answer: String })

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: () => {
            this.provider == EMAIL_PROVIDER.Email ? true : false;
        }
    },
    password: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true,
        default: EMAIL_PROVIDER.Email
    },
    phoneNumber: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        default: ROLE.Member,
        enum: [ROLE.Admin, ROLE.Member, ROLE.Merchant]
    },
    securityQuestions: [questionSchema]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User