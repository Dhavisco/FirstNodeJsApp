// const db = require('../util/database')

// const Cart = require('./cart');

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES(?, ?, ?, ?)', 
//     [this.title, this.price, this.imageUrl, this.description]
// );
//   }

//   static deleteById(id) {
    
//   }

//   static fetchAll() {
//   return db.execute('SELECT * FROM products');
//   }

//   static findById(id) {
//    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
// };

// };


const getDb = require('../util/database').getDb;
class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db.collection('products')
    .insertOne(this)
    .then(result => {
      console.log(result);
    } ).catch(err => {
      console.log(err);
    });
  }


  }


// const Product = sequelize.define('product',{
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true 
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;