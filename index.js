const http = require('http');
const data = { age : 5};
const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log('server started');
    res.setHeader('Dummy', 'DummyValue');
    res.setHeader('Content-Type', 'text/html');
    res.end('hello')
});

server.listen(8080)