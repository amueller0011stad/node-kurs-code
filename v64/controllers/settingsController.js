const 
    newsapi = require('newsapi-wrapper'),
    settingsService = require('../services/settingsService');

const renderSettings = (req, res) => {
    const settings = settingsService.readSettings();
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
    settingsService.writeSettings(req.body);
    renderSettings(req, res);
};

module.exports = {
    renderSettings,
    receiveSettings
};