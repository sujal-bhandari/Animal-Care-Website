const express= require("express")
require("./connect")
require("./connect2")
require("./connect3")

const app = express();
const body1=require('body-parser');
var Student1 = require("./connect");
var Student2 = require("./connect2");
var Student3 = require("./connect3");
const encoded=body1.urlencoded({extended:false})
app.use(express.static("public"))
app.get("/", (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.get("/adopt", (req,res)=>{
    res.sendFile(__dirname+'/adopt.html');
})
app.get("/signup", (req,res)=>{
    res.sendFile(__dirname+'/register.html');
})
app.get("/hire", (req,res)=>{
    res.sendFile(__dirname+'/hire.html');
})
app.get("/apply", (req,res)=>{
    res.sendFile(__dirname+'/apply.html');
})
app.post('/signup',encoded,async (req,res)=>{
    let student = await Student1(req.body);
    student.save()
        .then(() => {
            res.send(`
            <h2>User registered successfully!</h2>
            <p>Click <a href="/login">here</a> to login or click <a href="/">here</a> to move to the home page..</p>
        `);
        })
        .catch(err => console.log(err))
})
app.post('/hire',encoded,async (req,res)=>{
    let student = await Student2(req.body);
    student.save()
        .then(() => {
            res.send(`
            <h2>User Booked successfully!</h2>
            <p>Click <a href="/">here</a> to go back to the home page..</p>
        `);
        })
        .catch(err => console.log(err))
})
app.post('/apply',encoded,async (req,res)=>{
    let student = await Student3(req.body);
    student.save()
        .then(() => {
            res.send(`
            <h2>User Applied successfully!</h2>
            <p>Click <a href="/">here</a> to go back to the home page..</p>
        `);
        })
        .catch(err => console.log(err))
})
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/log.html')
})
app.post('/loggedin', encoded, async (req,res)=>{
    const username1=req.body.username;
    const password1 = req.body.password;
    Student1.findOne({ fname:username1, password:password1 })
        .then(student => {
            if (student) {
                
                res.redirect('/');
            } else {
                res.status(401).send('Invalid username or password');
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
})
app.get('/dashboard', (req,res)=>{
    res.send("Welcome User")
})
app.listen(8000, ()=>{
    console.log("Server is running on port 8080")
})