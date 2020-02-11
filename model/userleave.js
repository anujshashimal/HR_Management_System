const validator = require('validator')
const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const Task = require('./task')

const userLSchema = new mongoose.Schema({
    lvdate: {
        type: String,
        required: true,
        trim: true
    },
    fullday: {
        type: String,
        trim: true
    },
    halfday: {
        type: String,
        trim: true
    }
})

const UsersLe = mongoose.model('UsersLe', userLSchema)
module.exports = UsersLe

