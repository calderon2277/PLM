'use strict'

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 30
    },
    lastname: {
        type: String,
        required: true,
        max: 30
    },
    documentType: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    document: {
        type: String,
        required: true,
        max: 50,
        unique: false
    },
    email: {
        type: String,
        required: true,
        max: 20,
    },
    phone: {
        type: String,
        required: true,
        max: 20,
    },
    born: {
        type: String,
        required: true,
        max: 20,
    },
    file: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = model("User", userSchema);