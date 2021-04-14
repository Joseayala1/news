var express = require('express');
var eventregistry = require('eventregistry')

var badyParser = require("body-parser");

var  {EventRegistry, QueryArticlesIter} = require('eventregistry')
var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/static', express.static('dist'));
app.use(badyParser.json());
app.use(badyParser.urlencoded({ extended: true }));


const er = new EventRegistry({apiKey: "YOUR_API_KEY"});



app.get('/', function (req, res) {
    er.getConceptUri("George Clooney").then((conceptUri) => {
        const q = new QueryArticlesIter(er, {conceptUri: conceptUri, sortBy: "date"});
        q.execQuery((items) => {
            for(const item of items) {
                console.info(item);
            }
        })
    });
    res.send('');

});



app.listen(app.get('port'), () => {
    console.log('Servidor activo 1');
})