const 
    http = require('http'),
    fs   = require('fs'),
    path = require('path');
require('dotenv').config();

const servePage = (res, pageName) => {
    res.writeHead(200);
    let stream = fs.createReadStream('views/' + pageName);
    stream.pipe(res);
};

const servePublicFile = (res, url) => {
    res.writeHead(200);
    let stream = fs.createReadStream(path.join(__dirname, url));
    stream.pipe(res);
};

const server = http.createServer((req, res) => {
    console.log('Requesting ' + req.url);

    if (req.url.startsWith('/public')) {
        servePublicFile(res, req.url);
        return;
    }

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
    console.log('Server now listening at port ' + process.env.PORT);
});