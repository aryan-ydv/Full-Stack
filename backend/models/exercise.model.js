const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const mernSchema=new Schema({
    name:{type: String,  required: true},
    email:{type: String,  required: true},
   


});

 const Exercise =mongoose.model('Mern',mernSchema);
 module.exports=Exercise;
