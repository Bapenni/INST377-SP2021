
let express = require('express');
let app = express()
let port = 3000;

app.get('http://localhost:3000/labs/lab_4'), function (req, res) {
  res.send('Hello World');
});
app.listen(port)