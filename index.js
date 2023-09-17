const fs = require('fs');

const index = fs.readFileSync('index.html','utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;


const express = require('express');
const morgan = require('morgan');
const server = express();

//bodyParser
server.use(express.json());
// server.use(express.urlencoded());
server.use(morgan('default'));

server.use(express.static('public'));

// server.use((req,res,next) => {
//     console.log(req.method, req.ip, req.hostname, new Date(),req.get('User-Agent')); //logger
//     next();         
// })

const auth = (req, res, next) => {
    // console.log(req.query);
    if(req.body.password=='123') {
        next();
    } else{
        res.sendStatus(401);
    }
}

// server.use(auth);


// API - Endpoint - Route
server.get('/', auth, (req,res)=> {
    res.json({type:'GET'})
})
server.post('/', auth, (req,res)=> {
    res.json({type:'POST'})
})
server.put('/', (req,res)=> {
    res.json({type:'PUT'})
})
server.delete('/', (req,res)=> {
    res.json({type:'DELETE'})
})
server.patch('/', (req,res)=> {
    res.json({type:'PATCH'})
})


server.get('/', (req,res)=> {
    // res.send('<h1>hello</h1>')
    // res.sendFile("F:\Tutorials\NodeJs\CoderDost\node-app\index.html")
    // res.json(products)
    res.sendStatus(404);
})

server.listen(8080, ()=> {
    console.log("Server started");
})


// 2:20:14