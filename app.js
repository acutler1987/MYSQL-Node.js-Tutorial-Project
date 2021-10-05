const express = require('express');
const mysql = require('mysql');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// Connect to MYSQL...

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Paddys2021pub',
  database: 'join_us',
});

app.get('/', function (req, res) {
  // Find count of users in database...
  const q = 'SELECT COUNT(*) AS count FROM users;';
  connection.query(q, function (err, results) {
    if (err) throw err;
    let count = results[0].count;
    // res.send("We have " + count + " users in our database!");
    res.render('home', { data: count });
  });
});

app.post('/register', function (req, res) {
  let person = {
    email: req.body.email,
  };

  connection.query('INSERT INTO users SET ?', person, function (err, result) {
    if (err) throw err;
    res.send('Thanks for joining our waitlist!');
  });
});

// Get a joke...
app.get('/joke', function (req, res) {
  const joke =
    'What do you call a dog that does magic tricks? A labracadabrador.';
  res.send(joke);
});

// Get a random number...
app.get('/random_num', function (req, res) {
  const num = Math.floor(Math.random() * 100 + 1);
  res.send(`Your lucky number is ${num}!`);
});

app.listen(8080, function () {
  console.log('Server running on 8080!');
});
