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





// server.use(auth);


// API - Endpoint - Route

//Products
//API ROOT , base URL, example - google.com/api/v2/

// Read GET /products
server.get('/products',  (req,res)=> {
    res.json(products);
})

// Read GET /products/:id
server.get('/products/:id',  (req,res)=> {
    // console.log(req.params.id);
    const id = +req.params.id;
    const product = products.find(p=>p.id === id)
    res.json(product);
})


server.post('/', (req,res)=> {
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