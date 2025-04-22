const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

// const sequelize = require('./util/database');
// const Product = require('./models/product')
// const User = require('./models/user')
// const Cart = require('./models/cart')
// const CartItem = require('./models/cart-item')
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {


  User.findById('68078b10ea1fb70a3a54ee6f')
  .then(user => {
    req.user = user;
     //user;
    next()
  }).catch(err => console.log(err));
}) 

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//mongoose
mongoose
.connect('mongodb+srv://Davisco:Davisco32@cluster0.wkwvdtq.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Davisco',
        email: 'davisco@test.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});



