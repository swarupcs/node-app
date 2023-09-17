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


//MVC  model-view-controller
const createProduct = (req,res)=> {
    console.log(req.body);      //body parser important
    products.push(req.body);
    res.status(201).json(req.body);
}

const getAllProducts = (req,res)=> {
    res.json(products);
}

const getProduct = (req,res)=> {
    // console.log(req.params.id);
    const id = +req.params.id;
    const product = products.find(p=>p.id === id)
    res.json(product);
}

const replaceProduct = (req,res)=> {
    // console.log(req.params.id);
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id === id)
    products.splice(productIndex,1,{...req.body, id:id})
    res.status(201).json();
}

const updateProduct = (req,res)=> {
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id === id)
    const product = products[productIndex]
    products.splice(productIndex,1,{...product,...req.body})
    res.status(201).json();
}


const deleteProduct = (req,res)=> {
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id === id)
    const product = products[productIndex]
    products.splice(productIndex,1)
    res.status(201).json(product);
}

// server.use(auth);


// API - Endpoint - Route

//Products
//API ROOT , base URL, example - google.com/api/v2/

// Read GET /products
server.get('/products', getAllProducts );

//Create API  => POST /products
server.post('/products', createProduct );

// Read GET /products/:id
server.get('/products/:id', getProduct )

// Update PUT /products/:id
server.put('/products/:id', replaceProduct )

// Update PATCH /products/:id
server.patch('/products/:id', updateProduct)

// Update DELETE /products/:id
server.delete('/products/:id', deleteProduct)



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