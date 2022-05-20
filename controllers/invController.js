const express = require('express')
const router = express.Router()
const Item = require('../models/items')
const alert = require('alert'); 
// const prompts = require('prompts');

router.get('/', (req, res) => {
    Item.find({}, (err, items) => {
    res.render('index.ejs', {
      items: items
      })
      console.log(items)
    })
  })


router.get('/new', (req, res) => {
  res.render('new.ejs')
})

// router.post('/', (req, res) => {
//   if (req.body.deleted === "on") {
//     req.body.deleted = true
//   } else {
//     req.body.deleted = false
//   }
//     console.log(req.body)
//     Item.create(req.body, (error, createdItem) => {
//   if (error) {
//     console.log(error)
//     res.send(error)
//   } else {
//     console.log(createdItem)
//     res.redirect('/inv')
//     alert("Item has been added to the Database")
//   }
// })
// })

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



module.exports = router
