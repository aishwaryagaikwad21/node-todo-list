var data = [{item:'do exercise'},{item:'complete assignment'},{item:'watch friends'}];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
module.exports = function(app){

    app.get('/todo',function(req,res){
        res.render('todo',{todos:data});
    });

    app.post('/todo', urlencodedParser, function(req,res){
        data.push(req.body);
        res.json(data);
        console.log(req.body);
    });

    app.delete('/todo',function(req,res){

    });
}