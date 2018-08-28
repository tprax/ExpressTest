var express = require('express');
var router = express.Router();
var Game = require('../models').Game;

//Get from Database
router.get('/', function(req, res){
  Game.all()
  .then( function(games){
    return res.render('games', { games: games})
  })
})

//Post to our database
router.post('/', function(req, res){
  var title = req.body.title;
  Game.create({title: title})
  .then(function(){
    res.redirect('/games')
  })
})

//Delete from Database
router.delete('/:id', function(req, res){
  Game.findById(req.params.id)
  .then(function(game){
    game.destroy()
  })
  .then(function(){
    return res.redirect('/movies')
  })
})

//Edit Game in Database

router.get('/:id/edit', function(req, res){
  Game.findById(req.params.id)
  .then(function(game){
    return res.render('edit', {game: game})
  })
})

//Submit
router.put('/:id', function(req, res){
  Game.update(
    {title: req.body.title},
    {where: {id: req.params.id}}
  )
  .then( function(){
    return res.redirect('/games')
  })
})

//asc order
// router.get('/', function(req, res){
//   Game.all({
//     order: [
//       ['createdAt', 'ASC']
//     ]
//   })
//   .then(function(games){

//   })
// })

router.get('/', function(req, res){
  res.render('games', {games: games});
});

module.exports = router;