const express = require('express');
const router = express.Router();
const {handleHome,saveData, authenticate} = require('../controllers/control.js');
const { socketPath } = require('../controllers/socketIo.js');

router.get('/', handleHome);

router.get('/home', handleHome)

router.route('/contact')
.get((req, res) => {
    let title = {title: "contact"};
    res.render('contact',title);
})
.post(saveData);

router.route('/login')
    .get((req, res) => {
        let title = {title: "Login"};
        res.render('login.pug',title);
    }).post(authenticate);
  
router.route('/socket')
    .get((req, res) => {
    res.sendFile(socketPath);
})

    // <--->   <----->      <<----->>        
// app.get('/', (req, res) => {
//     res.write("<h1>Welcome to our server side connection</h1>");
//     res.send();
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>hello</h1>");
// })

// app.get('*', (req, res) => {
//     res.send("OOPS page not found");
// })

module.exports = router;