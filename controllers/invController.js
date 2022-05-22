const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const alert = require('alert'); 
// const prompts = require('prompts');

router.get('/', (req, res) => {
    Item.find({deleted: 'false'}, (err, items) => {
    res.render('index.ejs', {
      items: items
      })
      // console.log(items)
    })
  })

  router.get('/d', (req, res) => {
    Item.find({deleted: 'true'}, (err, items) => {
    res.render('index.ejs', {
      items: items
      })
      // console.log(items)
    })
  })

router.get('/new', (req, res) => {
  res.render('new.ejs')
})

router.post('/', (req, res) => {
  if (req.body.deleted === "on") {
    req.body.deleted = true
  } else {
    req.body.deleted = false
  }
    // console.log(req.body)
    Item.create(req.body, (error, createdItem) => {
  if (error) {
    console.log(error)
    res.send(error)
  } else {
    console.log(createdItem)
    res.redirect('/inv')
    // alert("Item has been added to the Database")
  }
})
})


router.get('/:id/edit', (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
    if (error){
      console.log(error)
      res.send(error)
    } else {
      res.render('edit.ejs', {item: foundItem})
    }
  })
})

router.delete('/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id, (error, deletedItem) => {
    if (error){
      console.log(error)
      res.send(error)
    } else {
      res.redirect('/inv')
      console.log("You hard deleted ", deletedItem)
    }
  })
})

router.get('/:id', (req, res) => {
    Item.findById(req.params.id, (err, items) => {
  res.render('show.ejs', {
    items: items,
    })
  })
})

router.put('/:id', (req, res) => {
  req.body.deleted = (req.body.deleted === 'on')
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, foundItem) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else {

      res.redirect('/inv/'+ req.params.id)
      console.log(req.body)
    }
  })
})

router.get('/del', (req, res) => {
  Item.find({ 'deleted' : 'true'}, 'name qty deleted', function(err, item) {
    if (err) return handleErr(err);
  
    console.log(item.name, item.qty, item.deleted)
    res.redirect('/inv')
  })
})

// Item.findOne({ 'deleted' : 'true'}, 'name qty deleted', function(err, item) {
//   if (err) return handleErr(err);

//   console.log(item.name, item.qty, item.deleted)
// })

router.put('/:id/buy', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, { $inc: { qty: -1} }, {new: true}, (error, foundItem) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else {
      res.redirect('/inv/'+ req.params.id)
    }
  })
})

router.put('/:id/del', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, { deleted : true }, {new: true}, (error, foundItem) => {
  if (error) {
    console.log(error)
    res.send(error)
  } else {
    console.log("You soft deleted", foundItem)
    res.redirect('/inv/'+ req.params.id)
  }
})
})

router.put('/:id/', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, foundItem) => {
  if (error) {
    console.log(error)
    res.send(error)
  } else {
    res.redirect('/inv/'+ req.params.id)
    console.log(req.body.deleted)
  }
})
})

router.patch('/:id', function (req, res) {
  var updateObject = req.body; // {last_name : "smith", age: 44}
  var id = req.params.id;
  db.users.update({_id  : ObjectId(id)}, {$set: updateObject});
});

module.exports = router
