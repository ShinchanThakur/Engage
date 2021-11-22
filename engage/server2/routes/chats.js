const router = require('express').Router();
let Chat = require('../models/chat.model');

router.route('/').get((req, res) => {
  
  Chat.find()
    .then(chats => res.json(chats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const room = req.body.room;
    const allValues = req.body.value;
    const id = req.body.id ; 

    if ( id !== "")
    {
        Chat.findOneAndUpdate({
          _id: {_id: id},
            allValues: {$push: {allValues: allValues}}
        })
    }
   
    // findByIdAndUpdate ( push value) ;
    // const time = req.body.time;
   
  
    if ( id === "")
    {
        const newChat = new Chat({
            room,
            allValues,
           
            
        });
      
        newChat.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
   
   
  });

//   router.route('/:id').delete((req, res) => {
//     console.log(req.params.id + " backend")
//     Todo.findByIdAndDelete(req.params.id)
//       .then(() => res.json("deleted"))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });


 
 
 
module.exports = router;