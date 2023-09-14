const mongoose = require('./dbConnection')

const nakylSchema = new mongoose.Schema({
    quote: String,
    autor: String
})

module.exports = mongoose.model("NAKYL", nakylSchema, 'nakyllar')