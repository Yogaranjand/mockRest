'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

function hash(passWord) {
    return bcrypt.hash(passWord, saltRounds);
}

function match(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}


module.exports = {
    hash: hash,
    match: match
};