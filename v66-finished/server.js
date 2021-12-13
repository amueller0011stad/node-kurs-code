const
    expressHandlebars = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routing = require('./routes/index'),
    session = require('express-session');
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
server.use(bodyParser.json());
server.use(express.static('public'));
server.use(session({
    secret: process.env.SESSION_SECRET || 'Please_SET_session_SeCreT',
    resave: false,
    saveUninitialized: true
}));
server.use((req, res, next) => {
    res.locals.isLoggedIn = req.session && req.session.isLoggedIn;
    res.locals.user = req.session && req.session.user;
    next();
});

server.engine('html', expressHandlebars({
    extname: 'html',
    partialsDir: 'views/partials'
}));

server.set('view engine', 'html');

server.use('/', routing);

server.listen(process.env.PORT, () => {
    console.log('Server now listening at port ' + process.env.PORT);
});