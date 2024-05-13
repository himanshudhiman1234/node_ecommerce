const User = require("../models/user")
const bcrypt = require("bcrypt")

const PostLogin = async(req,res)=>{
    try{

            const { fullname,email,phone,dob,gender,address,country,role} = req.body;

            const password = await bcrypt.hash(req.body.password,10)
            const newUser = new User({  
                fullname,
                password,
                email,
                phone,
                dob,
                gender,
                address,
                country,
                role
            })
            
            await newUser.save();
            res.redirect('/login');
            // res.status(201).json({  message : "User registered successfully"})

    }catch(error){
        res.status(500).json({ message: "Error registering User", error: error.message });

    }
}

module.exports = {PostLogin}