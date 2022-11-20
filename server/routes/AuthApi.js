import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = Router();

router.post('/register', async (req, res)=>{

    // get all the form data
    console.log(req.body);

    // check if user exists already with same email address
    const {email, firstName, lastName, password} = req.body;
    const userExists = await User.findOne({ email: email});
    console.log(userExists);
    if(userExists){
        res.status(406).json({message:"User already exists."});
        return;
    }

    // hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    console.log(hashedPassword);

    // store the user    
    const user = await User({email, firstName, lastName, password:hashedPassword});
    const savedUser = user.save();
    console.log(savedUser);



    res.status(201).json({message: "Successfully registered"});
});

export default router;