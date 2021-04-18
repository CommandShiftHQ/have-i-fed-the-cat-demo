const mysql = require("mysql2");
const path = require("path");
const faker = require('faker'); 

const args = process.argv.slice(2)[0];

const envFile = args === "test" ? "../.env.test" : "../.env";

require("dotenv").config({
  path: path.join(__dirname, envFile),
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
});

let insertedCats = 0;

connection.query(`CREATE TABLE IF NOT EXISTS ${DB_NAME}.Cats 
                    (id serial NOT NULL AUTO_INCREMENT,
                    name varchar(255) DEFAULT '',
                    breed varchar(255) DEFAULT '',
                    markings varchar(255) DEFAULT '',
                    lastFed datetime DEFAULT CURRENT_TIMESTAMP,
                    createdAt datetime NOT NULL DEFAULT NOW(),
                    updatedAt datetime NOT NULL DEFAULT NOW(), PRIMARY KEY (id))`, () => {
   
    // Don't do this in production code - we're just force inserting 100 records.
    while (insertedCats < 100) { 
        insertedCats++;
        insertCat(getCat(), insertedCats);
    }

    // When done inserting, close connection.
    connection.end(); 
 });

const getCat = () => {
    return [ 
        faker.name.findName(),
        faker.random.word(),
        faker.lorem.words(),
        faker.datatype.datetime()
    ]
}
  
const insertCat = (values, currentCatIndex) => { 
    connection.query(
        `INSERT INTO ${DB_NAME}.Cats (name, breed, markings, lastFed) VALUES (?, ?, ?, ?)`, 
        values, 
        () => console.log(`Finished inserting Cat ${currentCatIndex}`));
}
