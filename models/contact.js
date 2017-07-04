const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');


const ContactSchema = mongoose.Schema({
    id: Number,
    user: String,
    name: String,
    phone: String,
    address: String
});

const contactModel = mongoose.model("ContactModel", ContactSchema);

module.exports = contactModel;