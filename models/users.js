const mongoose = require('mongoose');

const adresseSchema = mongoose.Schema({
    numeroRue : String,
    rue : String,
    codePostal : Number,
    ville: String,
})

const userActionsSchema = mongoose.Schema({
    transport: Boolean,
    accompagnementDistance: Boolean,
    hebergement: Boolean,
})

const settingsSchema = mongoose.Schema({
    language: [String],
    accueillir: Boolean,
    seDeplacer: Boolean,
})

const userSchema = mongoose.Schema({
    email : String, 
    nom : String, 
    prenom : String, 
    password : String,
    token: String,
    adresse: adresseSchema,
    telephone: String,
    naissance: Date,
    isConnected: Boolean,
    idVerified: Boolean,
    telVerified: Boolean,
    avatarUri: String,
    lastPosition: {latitude: Number, longitude: Number},
    userActions: userActionsSchema,
    isAvailable: Boolean,
    nombreAide: Number,
    settings: settingsSchema, 
    favouritesHelpers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
});

const User = mongoose.model('users', userSchema);
module.exports = User;