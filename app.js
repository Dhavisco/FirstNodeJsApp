const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;

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
// const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=> {


  // User.findByPk(1)
  // .then(user => {
  //   req.user = user;
  //   next()
  // }).catch(err => console.log(err));
  next();
}) 

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
}
);


//Sequelize
// Product.belongsTo(User, {
//   constraints: true,
//   onDelete: 'CASCADE'
// });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, {through:OrderItem})

// sequelize
// .sync()
// // .sync()
// .then(result => {
//   return User.findByPk(1);
// //   console.log(result);
// }).then(user => {
//   if(!user){
//     User.create({name:'David', email:'test@test.com'})
//   }
//   return user;
// }).then(user => {
//   // console.log(user)
//   return user.createCart();
// }).then (cart => {
//   app.listen(3000);
// })
// .catch(err => {
//   console.log(err);
// })


