var express = require('express');
var todoController = require('./controllers/todocontroller')
var app = express();

app.listen(3000);

//setting template
app.set('view engine','ejs');

//static file
app.use(express.static('./public'));
//app.use(express.static('./public'));
todoController(app);

console.log('listening to port 3000');

