const 
    expressHandlebars = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    routing = require('./routes/index');
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

server.use('/', routing);

server.listen(process.env.PORT, () => {
    console.log('Server now listening at port ' + process.env.PORT);
});