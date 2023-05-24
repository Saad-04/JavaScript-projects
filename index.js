// import http from 'http';
// import { love } from './module.js';

// const server  = http.createServer((req,res)=>{
//         console.log(res.end(`this is ${love()}`))    
// })

// server.listen(5000,()=>{
// console.log("my name is saad")
// })

import express from "express";
import path from 'path';
import mongoose from "mongoose";

const app = express()
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

// all middlewares
app.set("view engine","ejs")
app.use(express.static(path.join(path.resolve(),'public')))
app.use(express.urlencoded({extended:true}))
app.get('/', (req, res) => {
        // res.sendStatus(500)}
        // res.json({
        //         "name": true,
        //         "age":23 ,
        // })
        // const p = path.resolve()
        // res.sendFile(path.join(p,'./index.html'))
        res.render("login.ejs")    
})
const userSchema = new mongoose.Schema({
       
        email: String,
        password: String,
      });
      const Message = mongoose.model("Message", userSchema);
// add data in json 
// app.get('/user', (req, res) => {
//             res.json(arr) 
//              res.render("user")  
// })

app.post('/',async(rq,rs)=>{
        // console.log(rq.body.email)
        const {email,password}=rq.body
    await Message.create({email,password})
    rs.send('done')
})
// login section start here 
app.post('/login',(req,res)=>{
res.cookie("token","its work");
res.redirect('/')
})

app.listen('5000', () => {
        console.log('server start')
})