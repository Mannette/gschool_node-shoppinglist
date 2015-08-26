var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect('/items');
});

// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// methods
ItemLibrary.prototype.addItem = function (name) {
  var newItem = {name: name, id: this.id};
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
var storage = new ItemLibrary();
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');

// route handler
router.get('/items', function (req, res) {
  res.json(storage.items);
});

router.post('/items', function (req, res) {
  var name = req.body.name;
  storage.addItem(name);
  res.json(storage.items);
});

router.put('/item/:id', function (req, res, next) {
  var name = req.body.name;
  var foodId = req.params.id - 1;

  if (storage.items[foodId]) {
    storage.items[foodId].name = name;
  } else {
    storage.addItem(name);
  }
  res.json(storage.items + ' You did it!');
});

router.delete('/item/:id', function (req, res, next) {
  var foodId = req.params.id - 1;

  if (storage.items[foodId]) {
    storage.items.splice(foodId, 1);
  } else {
    res.json('You can\'t delete something that isn\'t there!');
  }
  res.json(storage.items + ' Aaaaand it\'s gone!');
});


module.exports = router;
