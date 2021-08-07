const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'Karthik@3008',
    database:'student_details'
});

db.connect((err)=>{
    if(!err){
        console.log('Connected...');
    }
    else{
        console.log('Connected Failed');
    }
    
})

app.post('/create',(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const department = req.body.department;
    const state = req.body.state;
    const district = req.body.district;

    db.query('INSERT INTO STUDENTS (name,age,gender,department,state,district) VALUES (?,?,?,?,?,?)',[name,age,gender,department,state,district],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send('values inserted');
        }
    });

});

app.get('/students',(req,res)=>{
    db.query('SELECT * FROM STUDENTS',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put('/update',(req,res)=>{
    const id = req.body.id;
    const age =  req.body.age;
    db.query("UPDATE STUDENTS SET Age = ? WHERE id = ?", [age,id], (err,result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });
})

app.delete('/delete/:id',(req,res) => {
    const id = req.params.id;
    db.query("DELETE FROM STUDENTS WHERE id = ?",id, (err,result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.listen('3001',()=>{
    console.log('server running')
});