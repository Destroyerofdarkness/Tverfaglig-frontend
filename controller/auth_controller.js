
const jwt = require("jsonwebtoken");
const {deleteUser}=require("../handlers/fetchDataHandler.js")
const maxValidDate = 24 * 60 * 60;
const signJwt = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: maxValidDate,
  });
};

const createCookie = (req,res)=>{
  const {userId} = req.params
  try{
    const token = signJwt(userId)
    res.cookie("jwt",token, {httpOnly: true, maxAge: maxValidDate*1000})
    res.redirect("/")
  }catch(err){
    console.log(err)
  }
}

const render_login = (req, res) => {
  try {
    res.render("login", { title: "Sign In" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const render_register = (req, res) => {
  try {
    res.render("register", { title: "Sign Up" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


const sign_out_user =(req,res)=>{
  try{
    res.cookie("jwt","",{httpOnly: true, maxAge: 10 })
    res.status(200).redirect("/sign-in")
  }catch(err){
    console.log(err)
    res.status(300).send(err)
  }
};

const user_delete = async(req,res)=>{
    const user = req.params.user
    try{
      await deleteUser(user)
      res.cookie("jwt", "",{httpOnly:true, maxAge: 10})
      res.status(200).redirect("/sign-out")
    }catch(err){
        res.status(500).send(err)
    }
}

module.exports = { render_login, render_register,sign_out_user, user_delete, createCookie };
