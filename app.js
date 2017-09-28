var express = require('express'),
    app = express(),
    handlebars = require('express-handlebars').create({ defaultLayout:'main' }),
    bodyParser = require('body-parser'),
    fortune = require('./lib/fortune'),
    urlencodedParser = bodyParser.urlencoded({extended: false}),
    Logger = function (req, res, next) {
        console.log('log');
        next();
    };

app.engine('handlebars', handlebars.engine); //подключение движка шаблонизатора
app.disable('x-powered-by');//не отправлять данные о браузере и системе.
app.set('view engine', 'handlebars'); // выбираем движок представлений, на месте handlebars может быть pug(jade) методом app.set('views',) можно выбрать папку где храняться представления
app.set('port', process.env.PORT || 3000);//присваивание значения имени значения port, можно было просто написать 3000 или сохранить в переменную нмоер порта и вызвать в app.listen

app.use(Logger); // промежуточный обработчик который при каждом запросе делает log
app.use(express.static(__dirname + '/public'));//промежуточный обработчки с аргументов express.static(root, [options])

app.get('/',function (req, res, err) {
   res.render('home');  
});

app.get('/about', function(req, res, err){
    res.render('about', { fortune: fortune.getFortune});
});

app.get('/sign-in', function (req, res, err) {
    res.type('text/plain');
    res.send('sign-in page');
});

app.post("/register", urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    // res.send(`${req.body.userName} - ${req.body.userAge}`);
    res.redirect('/about'); //перенаправление после успешного получения данных на страницу about
});
// пользовательская страница 404 - not found
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// пользовательская страница 500 - server error
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' + app.get('port') + '; нажмите Ctrl+C для завершения.' );
});