const mongoose = require('mongoose');

mongoose.connect("mongodb://user:user@ds129030.mlab.com:29030/rambooj");

const ContactSchema = mongoose.Schema({
    id: Number,
    userId: Number,
    name: String,
    phone: String,
    address: String
});

const contactModel = mongoose.model("ContactModel", ContactSchema);

module.exports = contactModel;