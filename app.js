const express = require("express");

const app = express();

const cors = require("cors")

const path = require("path");

const cookieParser = require("cookie-parser")

const {checkUser}= require("./middleware/jwtAuth.js")

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use(express.json());

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(checkUser)

const main_router = require("./routes/default_router.js");

const auth_router = require("./routes/auth_routes.js");

const authorized_router = require("./routes/authorized_routes.js")

app.use(auth_router);

app.use(main_router);

app.use("/home", authorized_router)

app.use((req,res)=>{
  try{
    res.status(404).render("404", {title: "Page Not Found"})
  }catch{
    res.status(500).send("500 Internal Server Error")
  }
})

app.listen(3000, async () => {
  console.log("Server running on port 3000");
});
