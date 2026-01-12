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


module.exports = {render_login, render_register}
