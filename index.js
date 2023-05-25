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
import mongoose, {
        now
} from "mongoose";
import cookieParser from "cookie-parser";
import {
        nextTick
} from "process";
import jsonwebtoken from 'jsonwebtoken'
// const app = express()
// mongoose.connect("mongodb://127.0.0.1:27017", {
//         dbName: "backend",
// }).then(() => console.log("Database Connected")).catch((e) => console.log(e));

// // all middlewares
// app.set("view engine", "ejs")
// app.use(express.static(path.join(path.resolve(), 'public')))
// app.use(express.urlencoded({
//         extended: true
// }))
// app.use(cookieParser())
// const isAuthenticated = (req,res,next)=>{
//  const token = req.cookies.token
//         if (token) {
//                 next()
//         } else {
//                 res.render("login.ejs")
//         }
// }
// app.get('/', isAuthenticated,(req, res) => {
//         // res.sendStatus(500)}
//         // res.json({
//         //         "name": true,
//         //         "age":23 ,
//         // })
//         // const p = path.resolve()
//         // res.sendFile(path.join(p,'./index.html'))

//         res.render('logout')
// })
// const userSchema = new mongoose.Schema({
//         email: String,
//         password: String,
// });

// const Message = mongoose.model("Message", userSchema);
// // add data in json 
// // app.get('/user', (req, res) => {
// //             res.json(arr) 
// //              res.render("user")  
// // })

// app.post('/', async (rq, rs) => {
//         // console.log(rq.body.email)
//         const {
//                 email,
//                 password
//         } = rq.body
//         const done = await Message.create({
//                 email,
//                 password
//         })
//         if (done) {
//                 rs.send('done')
//         }
// })
// // login section start here 
// app.post('/login', (req, res) => {
//         res.cookie("token", "its work", {
//                 httpOnly: true,
//                 expires: new Date(Date.now() + 60 * 1000)
//         });
//         res.redirect('/')
// })
// // logout section start here 
// app.get('/logout', (req, res) => {
//         res.cookie("token", null, {
//                 expires: new Date(Date.now())
//         });
//         res.redirect('/')
// })

// app.listen('5000', () => {
//         console.log('server start')
// })
const app = express()
mongoose.connect("mongodb://127.0.0.1:27017", {
        dbName: "backend",
}).then(() => console.log("Database Connected")).catch((e) => console.log(e));

// all middlewares
app.set("view engine", "ejs")
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.urlencoded({
        extended: true
}))
app.use(cookieParser())

const user = new mongoose.Schema({
        email: String,
        password: String,
});
const User = mongoose.model("User", user);
// handler function 
const isAuthenticated = async(req, res, next) => {
        const {token} = req.cookies //get token from req.cookies
        if (token) {
                const decodeId =  jsonwebtoken.verify(token,'faf');
          req.user = await User.findById(decodeId._id)
                next()
        } 
        else {res.render("login.ejs")}
}
app.get('/', isAuthenticated, (req, res) => {
console.log(req.user)
        res.render('logout')
})


// login section start here 
app.post('/login', async (req, res) => {
        const {email,password} = req.body
        const user = await User.create({email, password}) //email,passand value are same
        const {_id} = user._id//_id from user._id
        const token = jsonwebtoken.sign({_id}, 'faf') //id and value is same

        res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 60 * 1000)
        });
        res.redirect('/')
})

// logout section start here 
app.get('/logout', (req, res) => {
        res.cookie("token", null, {
                expires: new Date(Date.now())
        });
        res.redirect('/')
})

app.listen('5000', () => {
        console.log('server start')
})
