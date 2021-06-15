const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    usename: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email"
        ]
    },
    displayName: {
        type: String,
        required: true
    },
},
{ timestamps: true }
);

moduls.exports = mongoose.model('user', userSchema);