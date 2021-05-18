const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://aryanydv281:Aryan@123@cluster0.dmeot.mongodb.net/new-mern-app",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("connection is  established succesfully!!");
}).catch((err)=>{
   console.log(err);
})
