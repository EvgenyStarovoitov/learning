var express = require('express')
    , router = express.Router()
    , note = require('../models/note')
    , bodyParser = require('body-parser')
    , urlencodedParser = bodyParser.urlencoded({extended: false});

// other controllers like users, notes, comments
router.use('/notes', require('../controllers/notes'));
// router.use('/', require('../middlewares/logger'));

// router.post('/note/add/some', urlencodedParser, function (req, res) {
//     console.log(req.body);
//     userNote = req.body.userNote,
//     date = new Date().toString();

//     note.create(userNote, function (err, note) {
//         res.redirect('/');
//     });
// });


router.get('/', function(req, res) {
    note.all(function(err, notes) {
        res.render('home', {notes: notes})
    });
});
router.get('/about', function(req, res, err){
    res.render('about');
});

module.exports = router;