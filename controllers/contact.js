const ContactModel = require('../models/contact');

const jwt = require('jsonwebtoken')
const secret = 'jwt demo'




class Contact {
    static async add(ctx) {
        const token = ctx.header.authorization
        let payload
        if (token) {
            payload = await jwt.verify(token.split(' ')[1], secret)
        }
        const newContact = ctx.request.body;
        console.log('newContact', newContact);
        ContactModel.count({}, function (err, num) {
            newContact.id = num + 1;
            newContact.user = payload.name;
            var mongoContact = new ContactModel(newContact);
            mongoContact.save();
        })
        return ctx.response.body = newContact
    };

    static async remove(ctx) {
        const token = ctx.header.authorization
        let payload
        if (token) {
            payload = await jwt.verify(token.split(' ')[1], secret)
        }
        ContactModel.findOne({id: ctx.params.id}, function(err, obj) {
            if (err) {
                console.log('run')
                return ctx.response.body = err
            } else if (obj === null) {
                console.log('run')
                return ctx.response.body = {
                    message: "The contact is not exist."
                }
            } else {
                if ( obj.user === payload.name) {
                    console.log('run')
                    ContactModel.remove({id: ctx.params.id});
                    obj.remove();
                }
            }
        })
        const result = {
                  code: 500,
                  message: 'Delete ok.',
                  data: ''
        }
        return ctx.response.body = result
    };

    static async list(ctx) {
        const token = ctx.header.authorization
        let payload
        if (token) {
            payload = await jwt.verify(token.split(' ')[1], secret)
        }
        let contacts = await ContactModel.find({user: payload.name})
        console.log(contacts)
        return ctx.response.body = contacts
    }
}

module.exports =  Contact;