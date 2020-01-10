/**
 * Shows how to use chaining rather than the `serialize` method.
 */

import log from 'electron-log';

const sqlite3 = require('sqlite3').verbose();

let db;

function createDb() {
  log.log('createDb chain');
  console.log('createDb chain');
  db = new sqlite3.Database('chain.sqlite3', createTable);
}

function createTable() {
  log.log('createTable lorem');
  console.log('createTable lorem');
 // db.run('CREATE TABLE IF NOT EXISTS item (item TEXT)', insertRows);
}

function insertRows(err, data) {
  log.log('insertRows item i err ', err, ' data', data);
  console.log('insertRows item i');
  const stmt = db.prepare('INSERT INTO item VALUES (?)');

  for (let i = 0; i < 10; i++) {
    stmt.run(`Rice ${i}`);
  }

  stmt.finalize();
}

export async function readAllRows(err, data) {
  log.log('readAllRows lorem ', err, ' data', data);
  console.log('readAllRows lorem');
  return new Promise((resolve, reject) => {
    db.all('SELECT rowid AS id, item FROM item', function(err, rows) {
      rows.forEach(function(row) {
        log.log(`${row.id}: ${row.item}`);
        console.log(`${row.id}: ${row.item}`);
      });
      // closeDb();
      resolve(rows);
    });
  });
}

function closeDb() {
  log.log('closeDb');
  console.log('closeDb');
  db.close();
}

export function runChainExample() {
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

// export default runChainExample;
