var express = require('express');
var router = express.Router();
var db = require('../models/postSchema');

exports.viewEmployees = function (req, res, next) {
  db.find({}).exec(function (err, result) {
    res.json(result)
  })
}
exports.addEmployee = function (req, res, next) {
  var newEmployee = new db({
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    department: req.body.department,
    gender: req.body.gender,
    age: req.body.age,
  });
  newEmployee.save(function (error, result) {
    if (error) {
      console.log('error in save ' + error);
    }
    else {
      res.json({ 'response': " Employee Added Successfully" });
    }
  })
}
exports.deleteEmployee = function (req, res, next) {
  db.remove({ _id: req.params.id }, function (error, result) {
    res.json(result);
  });
}
exports.getEmployee = function (req, res, next) {
  db.findById({ _id: req.params.id }, function (error, result) {
    res.json(result);
  })
}
exports.viewEmployee = function (req, res, next) {
  db.findById({ _id: req.params.id }, function (error, result) {
    res.json(result);
  })
}
exports.updateEmployee = function (req, res, next) {
  db.update({ _id: req.params.id }, {
    name: req.body.name,
    email: req.body.email,
    dob: req.body.dob,
    department: req.body.department,
    gender: req.body.gender,
    age: req.body.age,
  }, function (error, result) {
    res.json(result);
  })
}