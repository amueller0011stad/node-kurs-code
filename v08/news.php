<?

$ch = curl_init("https://newsapi.org/v2/top-headlines?country=de&apiKey=d18ddb3b4e1442d7b312bfa82a4a2a9a");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$result = curl_exec($ch);

$result = json_decode($result);
foreach ($result->articles as $article) {
    echo $article->title . "\n";
}
