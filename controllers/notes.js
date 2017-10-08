var express = require('express')
    , router = express.Router()
    , note = require('../models/note')
    , bodyParser = require('body-parser')
    , urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/add', urlencodedParser, function (req, res) {
    console.log(req.body);
    userNote = req.body.userNote,
    date = new Date().toString();

    note.create(userNote, function (err, note) {
        res.redirect('/notes');
    });
});

router.get('/', function(req, res) {
    note.all(function(err, notes) {
        res.render('notes', {notes: notes})
    });
});

module.exports = router;