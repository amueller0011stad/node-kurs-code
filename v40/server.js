const 
    expressHandlebars = require('express-handlebars'),
    express = require('express'),
    newsapi = require('newsapi-wrapper'),
    bodyParser = require('body-parser'),
    fs = require('fs');
require('dotenv').config();

const server = express();

server.set('viewDir', 'views');

const logUrlMiddleware = (req, res, next) => {
    console.log(req.url);
    next();
};

server.use(logUrlMiddleware);
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(express.static('public'));

server.engine('html', expressHandlebars({
    extname: 'html',
    partialsDir: 'views/partials'
}));

server.set('view engine', 'html');

const renderHome = (req, res) => {
    let articles = [],
        message = ''
        settings = readSettings();
    newsapi
        .setApiKey(settings['news-api-key'] || process.env.NEWS_API_KEY || '')
        .setCategory(settings['news-api-category'] || 'business')
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

const readSettings = () => {
    try {
        return JSON.parse(fs.readFileSync('settings.json'));
    } catch (e) {
        return {};
    }    
};

const renderSettings = (req, res) => {
    const settings = readSettings();
    res.render('settings', {
        title: 'Settings',
        heading: 'Settings',
        settingsActive: true,
        newsApiKey: settings['news-api-key'] || '',
        newsApiCategories: newsapi.getCategories().map(categoryName => {
            return {
                value: categoryName,
                label: categoryName,
                selected: categoryName === settings['news-api-category']
            };
        })
    });
};

const receiveSettings = (req, res) => {
    fs.writeFileSync('settings.json', JSON.stringify(req.body));
    renderSettings(req, res);
};

server.get('/admin', renderSettings);
server.get('/settings', renderSettings);
server.post('/settings', receiveSettings);

server.listen(process.env.PORT, () => {
    console.log('Server now listening at port ' + process.env.PORT);
});