const { findUserData } = require("../handlers/fetchDataHandler.js");

const user_page_priv_render = async (req, res, next) => {
  const username = req.params.user;
  try {
    const { quotes, user } = await findUserData(username);
    res.render("userPriv", {
      quotes: quotes,
      title: `Quotes - ${user.username}`,
    });
  } catch (err) {
    res.status(500).send(err);
    next();
  }
};

const user_page_priv_post = async (req, res) => {
  try {
  } catch (err) {
    const errors = handleQuoteError(err);
    res.status(300).json({ errors });
  }
};

module.exports = { user_page_priv_render, user_page_priv_post };
