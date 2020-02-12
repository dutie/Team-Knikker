const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://Knikker:TeamKnikkerA1@35.180.89.74:27017/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';

const state = {
    db: null
};
const connect = (cb) => {
    if (state.db)
        cb();
    else {
        // attempt to get database connection
        MongoClient.connect(url, (err, client) => {
            // unable to get database connection pass error to CB
            if (err)
                cb(err);
            // Successfully got our database connection
            // Set database connection and call CB
            else {
                state.db = client.db('Mongo_db');
                cb();
            }
        });
    }
}


const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect};