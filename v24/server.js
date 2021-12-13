const 
    http = require('http'),
    fs   = require('fs');
require('dotenv').config();

const servePage = (res, pageName) => {
    res.writeHead(200);
    let stream = fs.createReadStream('views/' + pageName);
    stream.pipe(res);
};

const server = http.createServer((req, res) => {
    console.log('Requesting ' + req.url);

    switch (req.url) {
        case '/settings':
            servePage(res, 'settings.html');
            break;
        default:
            servePage(res, 'home.html');
            break;
    }
});

server.listen(process.env.PORT, () => {
    console.log('Server listening at port ' + process.env.PORT);
});