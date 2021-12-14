const 
    expressHandlebars = require('express-handlebars'),
    express = require('express');
require('dotenv').config();

const server = express()
    .set('viewDir', 'views')
    .set('view engine', 'html')
    .use(express.static('public'))
    .engine('html', expressHandlebars({
        extname: 'html',
        partialsDir: 'views/partials'
    }))
    ;

server.get('/home', (req, res) => {
    res.render('home', {
        title: 'News',
        heading: 'Welcome to your news dashboard!',
        homeActive: true,
        articles
    });
});

server.get('/settings', (req, res) => {
    res.render('settings', {
        title: 'Settings',
        heading: 'Settings',
        settingsActive: true
    });
});

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

server.listen(3000, () => {
    console.log('Server now listening at port ' + process.env.PORT);
});