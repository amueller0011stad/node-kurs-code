const 
    http = require('http'),
    fs   = require('fs'),
    path = require('path');
require('dotenv').config();

const articles = [
    {
        url: 'https://example.com',
        title: 'Am Sonntag Krötenwanderung auf dem Immerdeich'
    },
    {
        url: 'https://example.com',
        title: 'Bayern kauft Ronaldo'
    },
    {
        url: 'https://example.com',
        title: 'Wirtschaft schwächelt sich durch den Sommer'
    }
];

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