var express = require("express");
var router = express.Router();
var assert = require("assert");

var url = "../server/data/data.json";

router.post("/insert", function(req, res, next) {
  var item = {
    name: req.body.title,
    description: req.body.description
  };
});
