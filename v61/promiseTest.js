const newsApi = require('newsapi-wrapper'),
    requestPromise = require('request-promise');
require('dotenv').config();

const sendPromise = newsApi
    .setApiKey(process.env.NEWS_API_KEY)
    .send();

let articles = [];

sendPromise
    .then(response => {
        articles = response.articles;
        return requestPromise(articles[0].url);
    })
    .then(html => {
        console.log(html.substr(0, 800));
        return requestPromise(articles[1].url);
    })
    .then(html => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(html);
            }, 1000);
        });
    })
    .then(html => {
        console.log('-----------------------------');
        console.log(html.substr(0, 800));
        return requestPromise(articles[2].url);
    })
    .then(html => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(html);
            }, 1000);
        });
    })
    .then(html => {
        console.log('-----------------------------');
        console.log(html.substr(0, 800));
    });


















// sendPromise
//     .then(response => {
//         return JSON.stringify(response);
//     })
//     .then(stringResponse => {
//         return stringResponse.substr(0, 200);
//     })
//     .then(str => {
//         return str.toUpperCase();
//     })
//     .then(str => {
//         console.log(str);
//     });
