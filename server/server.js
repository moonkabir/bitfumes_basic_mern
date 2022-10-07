import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
// First work when conection work then the DB connected
mongoose.connect('mongodb+srv://bitfumes_basic_mern:Moon123$@cluster0.32hdevq.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log("MongoDB Connection is successful"))
.catch((err)=> console.log(err));

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.post("/transaction",(req,res)=>{
    const {amount,description,date} = req.body;
    console.log(req.body);
    res.json({message:"Hello World"});
});

app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:4000");
})



