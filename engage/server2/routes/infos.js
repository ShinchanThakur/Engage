const router = require('express').Router();
let Info = require('../models/info.model');

router.route('/').get((req, res) => {
  
  Info.find()
    .then(infos => res.json(infos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userName = req.body.userName;
  const RegNo = req.body.RegNo;
  
const Maths = req.body.Maths;
const Physics = req.body.Physics;
const Chemistry = req.body.Chemistry;
//   const description = req.body.description;
//   const duration = Number(req.body.duration);
//   const date = Date.parse(req.body.date);


  const newInfo = new Info({
    userName,
     RegNo,
     Maths,
     Physics,
     Chemistry,
    //  date,
  });

  newInfo.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//   Info.findById(req.params.id)
//     .then(info => res.json(info))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
//await Model.deleteMany();
router.route('/deleteAll').get((req, res) => {
  Info.deleteMany()
    .then(info => res.json(info))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;