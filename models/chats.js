const mongoose = require('mongoose');

const chatsSchema = mongoose.Schema({
    token: String,
    text: String,
    createdAt: Date,
    prenom: String
})



const Chat = mongoose.model('chats', chatsSchema);
module.exports = Chat;