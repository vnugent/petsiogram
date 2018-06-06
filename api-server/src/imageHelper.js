'use strict';

const path = require('path');
const fs = require('fs');

exports.loadImageFile = path => {
  const bitmap = fs.readFileSync(__dirname + '/../day_zero/' + path);
  return new Buffer(bitmap).toString('base64');
};
