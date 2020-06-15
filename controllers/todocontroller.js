
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


module.exports = function(app){

    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if (err) throw err;
            res.render('todo',{todos:data});
        });
        
    });

    app.post('/todo', urlencodedParser, function(req,res){
        //get data from view and add to database
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        });
        
        //console.log(req.body);
    });

    app.delete('/todo/:item', function(req,res){
        //delete requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
}
