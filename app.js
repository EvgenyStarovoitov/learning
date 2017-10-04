var express = require('express'),
    app = express(),
    handlebars = require('express-handlebars').create({ defaultLayout:'main' }),
    bodyParser = require('body-parser'),
    fortune = require('./public/libs/fortune'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/test",
    db = require('./public/libs/db'),
    urlencodedParser = bodyParser.urlencoded({extended: false}), // для обработки форм в URL кодировки
    Logger = function (req, res, next) {
        console.log('log');
        next();
    };

db.connect(url, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
          process.exit(1)
    } else {
        app.listen(app.get('port'), function() {
            console.log('Listening on port: ' +  app.get('port') + '; click ctrl+c to shutdown');
        });
    };
});

app.disable('x-powered-by');//не отправлять данные о браузере и системе.
app.engine('handlebars', handlebars.engine); //подключение движка шаблонизатора
app.set('view engine', 'handlebars'); // выбираем движок представлений, на месте handlebars может быть pug(jade) методом app.set('views',) можно выбрать папку где храняться представления
app.set('port', process.env.PORT || 3000);//присваивание значения имени значения port, можно было просто написать 3000 или сохранить в переменную нмоер порта и вызвать в app.listen

app.use(Logger); // промежуточный обработчик который при каждом запросе делает log
app.use(express.static(__dirname + '/public'));//промежуточный обработчки который указывает откуда брать статичные файлы с аргументов express.static(root, [options])

app.get('/',function (req, res, err) {
   res.render('home');  
});

app.get('/about', function(req, res, err){
    res.render('about', { fortune: fortune.getFortune});
});

app.post("/register", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    var collection = db.get().collection('user');
    var users = {
        userName : req.body.userName,
        userAge : req.body.userAge,
        date : new Date().toString()
    };
    console.log(users);
    collection.insert(users);

    // res.send(`${req.body.userName} - ${req.body.userAge}`);
    res.redirect('/about'); //перенаправление после успешного получения данных на страницу about
});
// пользовательская страница 404 - not found
app.use(function(req, res, next){
    res.status(404), res.render('404');
});
// пользовательская страница 500 - server error
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500), res.render('500');
});
