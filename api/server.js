let express = require("express")
let mongodb =require("mongodb").MongoClient
let ObjectId = require('mongodb').ObjectId
let ourApp = express()
let db
let port = process.env.PORT
if(port==null||port==""){
  port=3000
}
//ourApp.use(express.static("public"))

let connectionString = "mongodb+srv://DBS_Project:Project001!@cluster0.stv1s.mongodb.net/DBS_project?retryWrites=true&w=majority"
mongodb.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true},(err,client) =>{
    db = client.db()
    ourApp.listen(port)
})
ourApp.use(express.json())
ourApp.use(express.urlencoded({extended:false}))

ourApp.get("/Login",(req,res)=>{
    console.log(req.body.Username)
    db.collection('Login').find({Username:req.body.Username,Password:req.body.Password}).toArray((err,login)=>{
        res.status(200).json(login)
    console.log('Login',login)

    })
ourApp.post("/ScheduleMeetings",(req,res)=>{
    let WMname=req.body.WMname;
    let HNIname=req.body.HNIname;
    let Date=req.body.Date;
    let Time=req.body.Time;
    Schedule_meetings.insertOne({Wname:WMname,HNIname:HNIname,Date:Date,Time:Time},(err,res)=>{
        console.log(res)
        res.status(200).json({ok:true})
    })
})
ourApp.get("/ScheduleMeetings",(req,res)=>{
    db.collection('Schedule_meetings').find({Wname:WMname,HNIname:HNIname,Date:Date,Time:Time}).toArray((err,Schedule_meetings)=>{
        res.status(200).json(Schedule_meetings)
    console.log('Login',login)
})
})
})
