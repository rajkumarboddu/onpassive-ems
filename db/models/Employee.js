const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    jobTitle: String,
    Department: String,
    location: String,
    age: Number,
    salary: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', employeeSchema);