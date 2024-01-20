const path = require('path');

const propertiesReader = require("properties-reader");
const propertiesPath = path.resolve(__dirname, "../conf/db.properties");
const properties = propertiesReader(propertiesPath);

const dbPrefix = properties.get("db.prefix");
const dbUsername = properties.get("db.username");
const dbPwd = properties.get("db.pwd");
const dbName = properties.get("db.name");
const dbUrl = properties.get("db.url");
const dbParams = properties.get("db.params");
const db_lesson_collection = properties.get("db.collections.lesson");
const db_order_collection = properties.get("db.collections.order");

const dbUri = `${dbPrefix}://${dbUsername}:${dbPwd}@${dbUrl}/?${dbParams}`;


const host = 'localhost';
const port = process.env.PORT || 3000;

module.exports = {
    dbPrefix,
    dbUsername,
    dbPwd,
    dbName,
    dbUrl,
    dbParams,
    db_lesson_collection,
    db_order_collection,
    dbUri,
    host,
    port,
}
