const ContactModel = require('../models/contact')

const jwt = require('jsonwebtoken')
const secret = 'jwt demo'

const APIError = require('../middlreware/rest').APIError

class Contact {
    static async add(ctx) {
        const user = ctx.state.user
        const newContact = ctx.request.body
        console.log('newContact', newContact)
        ContactModel.count({}, function (err, num) {
            newContact.id = num + 1
            newContact.userId = user.id
            var mongoContact = new ContactModel(newContact)
            mongoContact.save()
        })
        ctx.rest(newContact)
    }

    static async remove(ctx) {
        const user = ctx.state.user
        const contact = await ContactModel.findOne({id: ctx.params.id})
        if (contact) {
            if (contact.userId === user.id) {
                const deleteContact = await ContactModel.findByIdAndRemove(contact._id)
                ctx.rest(contact)
            } else {
                throw new APIError('permission:error', 'this contact is not belong to you.')
            }
        } else {
            throw new APIError('contact:not_exist', 'the contact is not exist.')
        }
    }

    static async list(ctx) {
        const user = ctx.state.user
        let contacts = await ContactModel.find({userId: user.id})
        return ctx.response.body = contacts
    }
}

export default Contact
