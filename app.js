const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
var ObjectID = require('mongodb').ObjectID;

const db = require("./db");
const collection = "Device";
const app = express();


app.use(express.static(__dirname + '/public'));

// parses json data sent to us by the user 
app.use(bodyParser.json());

// serve static html file to user
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// read
app.get('/getDevices', (req, res) => {

    db.getDB().collection('Device').find({}).toArray((err, documents) => {
        if (err)
            console.log(err);
        else {
            console.log(documents)
            res.json(documents);
        }
    });
});

//delete


app.get('/getTypes', (req, res) => {
    db.getDB().collection(collection).deleteMany({
        'name': ""
    },
    {
        'type':"existing types"
    });
    db.getDB().collection('Device').distinct("type", {}, (function (err, documents) {
        if (err)
            console.log(err);

        else {
            console.log(documents);
            res.json(documents);
        }
    }));
});
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'qr.html'));
})
app.get('/getJson', (req, res) => {
    console.log("get json now");
    db.getDB().collection(collection).find().sort({
        '_id': -1
    }).limit(1).forEach(
        function (doc) {
            console.log(doc._id);
            res.json(doc._id);
        });
});

//create
app.post('/', (req, res, next) => {
    // Document to be inserted
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err) {
            const error = new Error("Failed to insert device Document");
            error.status = 400;
            next(error);
        } else {

            res.json({
                result: result,
                document: result.ops[0],
                msg: "Successfully inserted device!!!",
                error: null
            });

        }

    });
    db.getDB().collection(collection).find().sort({
        '_id': -1
    }).limit(1).forEach(
        function (doc) {
            lastObjectId = doc._id;

        }
    )
});


db.connect((err) => {
    // If err unable to connect to database
    // End application
    if (err) {
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else {
        app.listen(3000, () => {
            console.log('connected to database, app listening on port 3000');
        });
    }


});