const {randomQuote}= require("../handlers/fetchDataHandler.js")


const user_page_public_render =async(req,res, next)=>{
    const username = req.params.user
    try{
        console.log(username)
        res.render("userPub",{quotes, title: `${username}'s quotes`})
    }catch(err){
        console.log(err)
        res.status(500)
        next()
    }
}

const render_home = async(req,res)=>{
    try{
        const quote = await randomQuote();
        res.render("index", { quote ,title: "Homepage"})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {render_home,
    user_page_public_render
}