const express = require('express');
const router =  express.Router();
const User = require('../models/Users')
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


//Route:1==> creating a user using:POST (/api/auth/createuser) no login required

router.post('/createuser',[
    body('name').isString(),
    body('email').isEmail(),
  body('password').isLength({ min: 3 })
], async(req,res)=>{

  let success=false;
    // if there are error ,return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //to check email already exist
    try{
    let user= await User.findOne({email:req.body.email});

    if(user){
        return res.status(400).json({error: "already exist"})
    }

    //crypting the password
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass
      });

      const data={
        user:{
          id:user.id
        }
      }

      success=true;

      const authtoken = jwt.sign(data, 'shhhhh') // sending the data with signature'shhhhh'

    res.json({success,authtoken});
  }catch(error){
    console.error(error.message);
    res.status(500).send("error ")
  }

      });



//Route:2==> Authenticate a user using:POST (/api/auth/login)  login required

router.post('/login',[
  
  body('email').isEmail(),
body('password',"password cannot be blank").exists()
], async(req,res)=>{
  let success=false;
  // if there are error ,return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;

  //to check email of the user
  try{
  let user= await User.findOne({email:email});

  success=false;

  if(!user){
      return res.status(400).json({success,error: "provide a valid credentials"})
  }

  //checking the password of the user
  const passwordComapre= await bcrypt.compare(password,user.password);


  if(!passwordComapre){
    return res.status(400).json({error: "provide a valid credentials"})
}
  

    const data={
      user:{
        id:user.id
      }
    }

    const authtoken = jwt.sign(data, 'shhhhh')
    success=true;

  res.json({success,authtoken});
}catch(error){
  console.error(error.message);
  res.status(500).send("internal server error ")
}

});


//Route:3==> Fetching a user data using:POST (/api/auth/getuser)  login required

router.post('/getuser',fetchuser, async(req,res)=>{
  

try{
  const userId= req.user.id
  const user = await User.findById(userId).select("-password");

  res.json(user);

  
}catch(error){
  console.error(error.message);
  res.status(500).send("internal server error ")
}

});



    


module.exports= router