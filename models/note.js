var db = require('../public/libs/db')

// Create note in db
exports.create = function( userNote, cb) {
    var collect = db.get().collection('notes');
    var note = {
        userNote : userNote,
        date : new Date().toString()
    };
    db.save(collect, note, cb);
    console.log('item save in notes collection');
};

// Get a particular note
// exports.get = function(id, cb) {
//     db.fetch({id:id}, function(err, docs) {
//         if (err) return cb(err);
//         cb(null, docs)
//     });
// };

// Get all notes
exports.all = function(cb) {
    //  db.fetch({}, cb);
    var collection = db.get().collection('notes');
    collection.find({ }).toArray(function(err, docs) {
        if(err) return cb(err);
        var arr = [];
        // using forEach with the rigth key
        docs.forEach(function (el) {
            arr.push(el.userNote);
        });
        // console.log(arr);
        cb(null, arr);
        // console.log(docs);
        // cb(null, docs);
    });
};

// Get all notes by a particular user
// exports.allByUser = function(user, cb) {
//     db.fetch({user: user}, cb);
// };