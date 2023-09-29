const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const events = require("events");
const event_emitter = new events.EventEmitter;

let userIsAuth = false;

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");


function passwordCheck(req,res,next){
    let password = req.body["pass"]
    if(password === "hibee"){
        userIsAuth = true;
    }
    next();
}
app.use(passwordCheck);


app.get("/", (req,res) =>{
    res.render("submit")
})


app.post("/check",(req,res) => {
if(userIsAuth){
    res.render("secret");
   }else{
    res.redirect("/");
   }
});

app.post("/logout",(req,res) =>{
    userIsAuth = false;
    res.redirect("/")
})

function Server(){
    console.log(`Server running on ${port}`);
}
event_emitter.addListener("Start", Server);

app.listen(port, () =>{
    event_emitter.emit("Start");
})