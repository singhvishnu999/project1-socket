const mongoose = require("mongoose");

const connection = async (url) => {
    return await mongoose.connect(url);
}
connection().then(() => {
    console.log("sucessfully");
}).catch( (err) => {
    console.log(err);
})

const vishnuSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    password : String,
    address: String
})

const vishnu = new mongoose.model('children', vishnuSchema);

module.exports = {vishnu, connection};

// let obj1 = new vishnu({name : 'Vishnu Singh', age : 20});
// let obj2 = new vishnu({name : 'Prince yadav', age :19});
// obj1.save();
// obj2.save();
// const find = vishnu.find({name : 'vishnu singh'});
