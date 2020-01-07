/**
 * Shows how to use chaining rather than the `serialize` method.
 */

const sqlite3 = require('sqlite3').verbose();

let db;

function createDb() {
  console.log('createDb chain');
  db = new sqlite3.Database('chain.sqlite3', createTable);
}

function createTable() {
  console.log('createTable lorem');
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)', insertRows);
}

function insertRows() {
  console.log('insertRows Ipsum i');
  const stmt = db.prepare('INSERT INTO lorem VALUES (?)');

  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`);
  }

  stmt.finalize(readAllRows);
}

function readAllRows() {
  console.log('readAllRows lorem');
  db.all('SELECT rowid AS id, info FROM lorem', function(err, rows) {
    rows.forEach(function(row) {
      console.log(`${row.id}: ${row.info}`);
    });
    closeDb();
  });
}

function closeDb() {
  console.log('closeDb');
  db.close();
}

function runChainExample() {
  createDb();
}

function createDB() {
  const db = new sqlite3.Database(':memory:', err => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.close();
}

export default runChainExample;
