const express = require('express');
const app = express();
const mongo = require('../models/mongo.js');
const {socket, socketPath} = require('./socketIo.js')

const {vishnu} = require('../models/mongo')

const handleHome = (req, res) => {
    // let cont = "This is a page to take information from gym user"
    let params = {title:"chatting application"};
    res.render('index.pug', params);
}

const saveData = (req, res) => {
    // let output1 = stringify(req.body);
    // console.log(output1

    // adding data to database
    let data = new vishnu(req.body);
    data.save();
    req.body = ' ';
    console.log(req.body);
    // let output = `The name of user is ${req.body.name}, he/she is studying ${req.body.Course}, he/ she is ${req.body.Gender}, ho/her   contact number is ${req.body.phone}. `
    // fs.writeFileSync('output.txt', output);
    res.status(200).render('login.pug');
}

const authenticate = async (req, res) => {
    const { phone, password } = req.body;
    // console.log({phone, email});
    const user = await vishnu.findOne({ phone, password });
    // console.log(user);
    // const find = vishnu.find({name : 'vishnu singh'});

    if (user == null) {
        let params = {title:"invalid details"};
        res.render("login.pug",params);

    }
    else {
    let params = { name: user.name, phone : user.phone, email: user.email};
        res.render("profile.pug", params);
    }
}

module.exports = { handleHome, saveData, authenticate }