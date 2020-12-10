var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:test@cluster0.pb8xw.mongodb.net/test');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo',todoSchema);

//var data = [{item: 'get milk'},{item: 'get todo app working'},{item: 'get dressed'},{item: 'get dressed2'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

function myTrim(x) {
return x.replace(/^\s+|\s+$/gm,'');
}

module.exports = function(app)
{
    app.get('/todo',function(req,res){
      Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo' , {todos: data});
      });
    });


    app.post('/todo',urlencodedParser,function(req,res){
      var newTodo = Todo(req.body).save(function(err,data){
        if(err) return err;
        res.json(data);
      });
    });

    app.delete('/todo/:item',function(req,res){
      Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err,data){
        if(err) throw err;
        res.json(data);
      });
    });
}
