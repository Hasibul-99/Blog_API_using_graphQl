const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        authId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('post', postSchema)