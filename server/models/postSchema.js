
var mongoose = require('./mongoose'),
    Schema = mongoose.Schema;

var EmployeeSchema = new Schema({
    name: String,
    email: String,
    dob: Date,
    department: String,
    gender: String,
    age: Number,
});

module.exports = mongoose.model('employees', EmployeeSchema);