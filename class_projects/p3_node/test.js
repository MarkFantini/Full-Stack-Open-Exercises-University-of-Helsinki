require('dotenv').config();
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI;
console.log(url)