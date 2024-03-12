const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/loginforbharat');
const db = mongoose.connection
db.on('error', ()=> console.log("Error in connecting to Database"));
db.once('open', ()=> console.log("Connected to Database"))

app.post("/sign_up", (req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const phno = req.body.phno;
    const gender = req.body.gender;
    const password = req.body.password;

    const data = {
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "passwod": password
    }  
    
    db.collection('users').insertOne(data,(err, colection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully")
    })
    return res.redirect('signup_success.html')
})


app.get("/", (req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000");