import sqlite3 from ('sqlite3').verbose();
var db = new sqlite3.Database('abcd');

db.serialize(function() {
  db.run("CREATE TABLE user (id INT, dt TEXT)");

  var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
  for (var i = 0; i < 10; i++) {

  var d = new Date();
  var n = d.toLocaleTimeString();
  stmt.run(i, n);
  }
  stmt.finalize();

  db.each("SELECT id, dt FROM user", function(err, row) {
      console.log("User id : "+row.id, row.dt);
  });
});

db.close();
