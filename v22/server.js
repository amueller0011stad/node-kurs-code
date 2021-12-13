const http = require('http');
require('dotenv').config();

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Node.js talking... Really!');
});

server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});