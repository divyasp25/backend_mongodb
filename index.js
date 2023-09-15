const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/divyadb').then(()=>{
    console.log("db connected success");
}).catch((err)=>{
    console.log(err);
})
var conn=mongoose.connection;
app.get('/delete', function(req,res){
    let data={"name":"ham","age":20,"email":"ham@gmail.com"}
        conn.collection('enemy').deleteOne(data, (err,result)=>{
        if(err){
            res.status(400).send("Error inserting data")
        }else{
            res.status(200).send("delete data Success")
        }
    })
})

app.get('/insert', function(req,res){
    let data=[{"name":"ham","age":20,"email":"ham@gmail.com"},{"name":"blany","age":19,"email":"blany@gmail.com"},{"name":"amar","age":21,"email":"amar@gmail.com"},{"name":"prinks","age":18,"email":"prinks@gmail.com"}]
        conn.collection('enemy').insertMany(data, (err,result)=>{
        if(err){
            res.status(400).send("Error inserting data")
        }else{
            res.status(200).send("Inserting data Success")
        }
    })
})

app.get('/update', function(req,res){
        conn.collection('enemy').updateOne({"name":"paneer"},{$set:{"name":"Ryaan"}}).then((result)=>{
            res.status(202).send(result)
        }).catch((err)=>{
            res.status(400).send(result)
        })
})


//display all available data in a database
app.get('/display', function(req,res){
        conn.collection('enemy').find({}).toArray().then((result)=>{
            res.status(202).send(result)
        }).catch((err)=>{
            res.status(400).send(result)
        })
})
app.listen(4005)