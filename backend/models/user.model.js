const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    total_credits: { type: Number, default: process.env.DEFAULT_CREDITS}
},
    {
        collection: 'user-data'
    }

)

const model = mongoose.model('UserData', User);

module.exports = model;