        const express = require("express");
        const exphbs = require('express-handlebars');
        const bodyParser = require('body-parser')
        const path = require("path");
        const {PostLogin} = require("../controllers/registerController")
        const {postLoginData} = require("../controllers/LoginController")
        const verifyToken = require('../middleware/jwtToken');
        require('../config/db');
        const hbs = require("hbs");
       

        const app = express();
        const PORT = 8000;
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        
        const partialsDir = path.join(__dirname, '..', 'views', 'partials');

        // Register partials using the correct directory path
        hbs.registerPartials(partialsDir);
        app.use(express.static(path.join(__dirname, '../public')));

        // Set Handlebars as the template engine
        app.engine('hbs', require('hbs').__express);
        app.set('view engine', 'hbs');
        app.use(express.json());

        // Set the directory where your views are located
        app.set('views', path.join(__dirname,'..' ,'views'));



        app.get('/seller-dashboard',(req,res)=>{
            res.render('seller/index')
        })

        app.get('/register',(req,res)=>{
            res.render('register/register',{errorMessage:req.query.error})
        })


        app.post('/postregister',PostLogin)
        
        
        // Define route to render login page
        app.get('/login', (req, res) => {
            res.render('login/login');
        });
        app.post('/postLoginData',postLoginData)

        // Define route for home page
        app.get("/", (req, res) => {
            res.send("HELLO FROM EXPRESS");
        });
        app.get("/", (req, res) => {
            res.send("HELLO FROM EXPRESS");
        });


        // Start the server
        app.listen(PORT, () => {
            console.log(`Express server running at ${PORT}`);
        });
