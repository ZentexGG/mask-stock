const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            required: 'Username is required',
            unique: true
        },
        email: {
            type: String,
            required: 'Email is required', 
            unique: true
        },
        password: {
            type: String,
            required: 'Password is required',
            unique: true
        },
        hospital: {
            type: String,
            required: 'Hospital is required'
        }
    }
)

module.exports = mongoose.model('Account', accountSchema)


    
