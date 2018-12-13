const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    title: {type: String, required: true},
    details: {type: String, required: true}
})

module.exports = mongoose.model('ToDo', TodoSchema);
