const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const getUsername = await fetch(
      `http://backend.megatron.ikt-fag.no:6001/checkuser/${token}`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await getUsername.json();
    if (data.username) {
      res.locals.user = data.username;
      console.log(data.username);
      next();
    } else {
      res.locals.user = null;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const authorize = (req, res, next) => {
  const user = req.params.user;
  const loggedIn = res.locals.user.username;
  try {
    if (user === loggedIn) {
      next();
    } else {
      res.redirect(`/${user}`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
module.exports = { authenticate, authorize, getUser };
