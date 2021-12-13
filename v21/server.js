const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Node.js talking... Really!');
});

server.listen(port, () => {
    console.log('Server listening at port ' + port);
});