const 
    http = require('http'),
    fs   = require('fs'),
    path = require('path'),
    handlebars = require('handlebars');
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

const registerPartials = () => {
    const files = fs.readdirSync('views/partials');
    files.forEach(f => {
        handlebars.registerPartial(f.replace(".html", ""), fs.readFileSync('views/partials/' + f, 'utf-8'));
    });

//    const html = fs.readFileSync('views/partials/head.html', 'utf-8');
//    handlebars.registerPartial('head', html);

//    const navHtml = fs.readFileSync('views/partials/navigation.html', 'utf-8');
//    handlebars.registerPartial('navigation', navHtml);
};

registerPartials();

const servePage = (res, pageName, data) => {
    fs.readFile('views/' + pageName, 'utf-8', (err, html) => {
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end();
        } else {
            res.writeHead(200);
            const templateFunction = handlebars.compile(html);
            res.end(templateFunction(data || {}));
        }
    });
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
            servePage(res, 'settings.html', {
                title: 'Settings',
                heading: 'Settings',
                settingsActive: true
            });
            break;
        default:
            servePage(res, 'home.html', {
                title: 'News',
                heading: 'Welcome to your news dashboard!',
                homeActive: true,
                articles
            });
            break;
    }
});

server.listen(3000, () => {
    console.log('Server now listening at port ' + 3000);
});