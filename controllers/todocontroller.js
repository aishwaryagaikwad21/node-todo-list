var data = [];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});
var mongoose = require("mongoose"); //connecting node js environment with mongobd
mongoose.connect("mongodb://localhost:27017/todo",{ useUnifiedTopology: true },(error)=>{
    if(!error)
    {
        console.log("Successfully connected to database");
    }
    else
    {
        console.log("Error connecting to database.")
    }
});

var todoSchema = new mongoose.Schema({
    item:String
});
var Todo = mongoose.model('todo',todoSchema);
var itemOne = Todo({item:'sleep'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
})

module.exports = function(app){

    app.get('/todo',function(req,res){
        res.render('todo',{todos:data});
    });

    app.post('/todo', urlencodedParser, function(req,res){
        data.push(req.body);
        res.json(data);
        //console.log(req.body);
    });

    app.delete('/todo/:item', function(req,res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
}