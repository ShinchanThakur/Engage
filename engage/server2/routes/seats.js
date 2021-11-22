const router = require('express').Router();
let Seat = require('../models/seat.model');

router.route('/').get((req, res) => {
  
  Seat.find()
    .then(seats => res.json(seats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const maths = req.body.maths;
    const physics = req.body.physics;
    const chemistry = req.body.chemistry;
   
  
    const newSeat = new Seat({
        maths,
        physics,
        chemistry
    });
  
    newSeat.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/deleteAll').get((req, res) => {
    Seat.deleteMany()
      .then(seat => res.json(seat))
      .catch(err => res.status(400).json('Error: ' + err));
  });

//   router.route('/:id').delete((req, res) => {
//     console.log(req.params.id + " backend")
//     Todo.findByIdAndDelete(req.params.id)
//       .then(() => res.json("deleted"))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });


 
 
 
module.exports = router;