const router = require('express').Router();
let Todo = require('../models/todo.model');

router.route('/').get((req, res) => {
  
  Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const text = req.body.text;
   
  
    const newTodo = new Todo({
        text
    });
  
    newTodo.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    console.log(req.params.id + " backend")
    Todo.findByIdAndDelete(req.params.id)
      .then(() => res.json("deleted"))
      .catch(err => res.status(400).json('Error: ' + err));
  });


 
 
 
module.exports = router;