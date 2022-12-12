const mongoose = require('mongoose');

const helpsSchema = mongoose.Schema({
    askerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    helperId: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    date: Date,
    helpType: String,
})



const Help = mongoose.model('helps', helpsSchema);
module.exports = Help;