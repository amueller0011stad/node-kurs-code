const API_KEY = 'd18ddb3b4e1442d7b312bfa82a4a2a9a';
var request = require('request');

function printUsage() {
    console.log('Usage: node news.js <category>');
    console.log('Categories: business entertainment general health science sports technology');
}

var category = 'business'; // parameter -c 
var country  = 'de';  // parameter -l
var numArgs = process.argv.length;
var currentArg;

for (var i = 2; i < numArgs; i++) {
    currentArg = process.argv[i];
    if (currentArg === '-h' || currentArg === '--help') {
        printUsage();
        process.exit(0);
    } else if ((currentArg === '-c' || currentArg === '--category') && numArgs > i) {
        i += 1;
        category = process.argv[i];
    } else if ((currentArg === '-l' || currentArg === '--country') && numArgs > i) {
        i += 1;
        country = process.argv[i];
    } 
}



request(
    'https://newsapi.org/v2/top-headlines?country=' + country + '&apiKey=' + API_KEY + '&category=' + category, 
    function (error, response, body) {

        if (response.statusCode === 200) {
            var bodyObj = JSON.parse(body);
            console.log("Ergebnisse insgesamt: " + bodyObj.totalResults);

            for (var i = 0; i < bodyObj.articles.length; i++) {
                console.log((i+1) + '. ' + bodyObj.articles[i].title);
            }
        }
    }
);


// {
//     "status": "ok",
//     "totalResults": 20,
//     "articles": [
//     {
//     "source": {
//     "id": null,
//     "name": "Nypost.com"
//     },
//     "author": null,
//     "title": "Support dog reportedly bites girl as she boarded flight",
//     "description": null,
//     "url": "https://nypost.com/2018/02/23/support-dog-reportedly-bites-girl-as-she-boarded-flight/",
//     "urlToImage": null,
//     "publishedAt": "2018-02-23T23:07:00Z"
//     },
//     {
//     "source": {
//     "id": null,
//     "name": "Npr.org"
//     },
//     "author": "Laurel Wamsley",
//     "title": "Gothamist Properties Will Be Revived Under New Ownership: Public Media",
//     "description": "WNYC will buy Gothamist, KPCC will acquire LAist, and WAMU is taking over DCist. The move is funded by two anonymous donors \"who are deeply committed to supporting local journalism initiatives.\"",
//     "url": "https://www.npr.org/sections/thetwo-way/2018/02/23/588388525/gothamist-properties-will-be-revived-under-new-ownership-public-media",
//     "urlToImage": "https://media.npr.org/assets/img/2018/02/23/wnyc-mic_wide-8d7a45937e30034aed706e8a2578814b2d3fe8db.jpg?s=1400",
//     "publishedAt": "2018-02-23T23:04:00Z"
//     }
// ]}