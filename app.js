const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://Davisco:Davisco32@cluster0.wkwvdtq.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

// const sequelize = require('./util/database');
// const Product = require('./models/product')
// const User = require('./models/user')
// const Cart = require('./models/cart')
// const CartItem = require('./models/cart-item')
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next)=> {

   if (!req.session.user) {
      return next();
    }

  User.findById(req.session.user._id)
  .then(user => {
    req.user = user;
     //user;
    next()
  }).catch(err => console.log(err));
}) 

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

//mongoose
mongoose
.connect(MONGODB_URI)
.then(result => {
  // User.findOne().then(user => {
  //   if (!user) {
  //     const user = new User({
  //       name: 'Davisco',
  //       email: 'davisco@test.com',
  //       cart: {
  //         items: []
  //       }
  //     });
  //     user.save();
  //   }
  // });
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});



