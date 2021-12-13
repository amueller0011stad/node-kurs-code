const 
    expressHandlebars = require('express-handlebars'),
    express = require('express'),
    newsapi = require('newsapi-wrapper');
require('dotenv').config();

const server = express();

server.set('viewDir', 'views');

const logUrlMiddleware = (req, res, next) => {
    console.log(req.url);
    next();
};

server.use(logUrlMiddleware);

server.use(express.static('public'));

server.engine('html', expressHandlebars({
    extname: 'html',
    partialsDir: 'views/partials'
}));

server.set('view engine', 'html');

const renderHome = (req, res) => {
    let articles = [],
        message = '';
    newsapi
        .setApiKey(process.env.NEWS_API_KEY)
        .send()
        .then(response => {
            articles = response.articles;
        })
        .catch(err => {
            message = 'Error when retrieving articles from NewsAPI';
        })
        .then(() => {
            res.render('home', {
                title: 'News page',
                heading: 'Welcome to your news dashboard!',
                homeActive: true,
                articles,
                message
            });
        });
};

server.get('/', renderHome);
server.get('/home', renderHome);

const renderSettings = (req, res) => {
    res.render('settings', {
        title: 'Settings',
        heading: 'Settings',
        settingsActive: true
    });
};

server.get('/admin', renderSettings);
server.get('/settings', renderSettings);

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

server.listen(process.env.PORT, () => {
    console.log('Server now listening at port ' + process.env.PORT);
});