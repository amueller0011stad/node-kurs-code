const 
    router = require('express').Router(),
    newsapi = require('newsapi-wrapper'),
    fs = require('fs');

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

router.get('/', renderHome);
router.get('/home', renderHome);
router.get('/admin', renderSettings);
router.get('/settings', renderSettings);
router.post('/settings', receiveSettings);

module.exports = router;