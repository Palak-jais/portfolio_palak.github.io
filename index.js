require('dotenv').config()
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require('mongoose')
const alert=require('alert');
const app=express();


app.use( bodyParser.json() );   
app.use(bodyParser.urlencoded({     
  extended: true
})); 

const db=process.env.MONGO_URL
mongoose.connect(db,{
useNewUrlParser: true, 
useUnifiedTopology: true    
 
}).then(()=>{
    console.log("connected")
}).catch((err)=>console.log(err));

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


var userSchema = new mongoose.Schema({
    email: String,
    subject:String,
    message:String,
    suggestion:String
});

var User = mongoose.model('User', userSchema);

app.post('/submit', async function (request, response){
    var u = new User({
        email: request.body.email,
        subject:request.body.subject,
        message:request.body.message,
        suggestion:request.body.suggestion

    });
    const user = await User.findOne({email:request.body.email });
    if (user){
        alert('You already provided feedback wait for response');
        response.render("contact")

    
    }
    else{
        u.save();
        alert("saved succesfully");
        res.render("contact")
        
    
    }   
    
});

app.get("/", function(req,res){
    res.render("home");

});
app.get("/about", function(req,res){
    res.render("about");

});
app.get("/contact", function(req,res){
    res.render("contact");

});
app.get("/projects", function(req,res){
    res.render("projects");

});
app.get("/education", function(req,res){
    res.render("education");

});
app.get("/skills", function(req,res){
    res.render("skills");

});


 app.listen(3000,function(){
    console.log("listening to port 3000");
 });