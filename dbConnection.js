const mongoose = require('mongoose')
const URL = 'mongodb://127.0.0.1:27017/nakyl'

mongoose.connect(URL)
.then(()=>{
  console.log('Succesfully connected');})
.catch((err)=>{
  console.error(err);
});

module.exports = mongoose 