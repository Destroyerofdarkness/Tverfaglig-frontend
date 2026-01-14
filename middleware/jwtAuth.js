const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.secret, (err, decodedToken) => {
      if (err) {
        console.log("Error:", err);
        res.redirect("/sign-in");
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    res.redirect("/sign-in");
  }
};

const checkUser = async(req,res,next) =>{
const token = req.cookies.jwt
try{
  const getUser = await fetch(`http://localhost:4000/checkuser/${token}`,{
    method: "POST",
    body: JSON.stringify({token}),
    headers: {"Content-Type": "application/json"}
  })
  const data = await getUser.json()
  if(data.username){
    res.locals.user = data.username
    console.log(data.username)
    next()
  }else{
    res.locals.user = null
    next()
  }
}catch(err){
  console.log(err);

}
}

const authorize = (req,res,next)=>{
  const user = req.params.user
  const loggedIn = res.locals.user.username
  if(user === loggedIn){
    next()
  }else{
    res.redirect(`/${user}`)
  }
}
module.exports = { authenticate, authorize, checkUser };
