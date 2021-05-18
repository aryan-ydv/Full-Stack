const express =require("express");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();
require("./db/config");
const app=express();
const port =process.env.PORT || 5000;
const uri=process.env.ATLAS_URI;



app.use(cors());
app.use(express.json());

const exerciseRouter=require("./routes/exercises");

app.use('/exercises',exerciseRouter);

app.listen(port,()=>{
    console.log(`app is running on ${port}`);
})