var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = [
    { username: 'John', password: 'password'},
    { username: 'Peter', password: 'password'},
    { username: 'Amy', password: 'password'},
    { username: 'Hannah', password: 'Mountain 21'},
    { username: 'Michael', password: 'Valley 345'},
    { username: 'Sandy', password: 'Ocean blvd 2'},
    { username: 'Betty', password: 'Green Grass 1'},
    { username: 'Richard', password: 'Sky st 331'},
    { username: 'Susan', password: 'One way 98'},
    { username: 'Vicky', password: 'Yellow Garden 2'},
    { username: 'Ben', password: 'Park Lane 38'},
    { username: 'William', password: 'Central st 954'},
    { username: 'Chuck', password: 'Main Road 989'},
    { username: 'Viola', password: 'Sideway 1633'}
  ];
  dbo.collection("users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
