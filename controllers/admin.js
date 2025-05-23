const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
   const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price; 
  const description = req.body.description;


  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  }
  );
  
//   const product = new Product(null, title, imageUrl, description, price);
//   product
//   .save()
//   .then(()=> {
//     res.redirect('/');
//   })
//   .catch(err => console.log(err));
// };
// req.user.createProduct(
//   {
//     title: title,
//     price: price,
//     imageUrl: imageUrl,
//     description: description

//   }
// )
product
.save()
.then(result => {
  console.log(result);
  console.log('Created Product');
  res.redirect('/admin/products');
}).catch(err => {
  console.log(err);
});

// Product.create(
//   {
//     title: title,
//     price: price,
//     imageUrl: imageUrl,
//     description: description

//   })

};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  
  Product.findById(prodId)
  .then(product => {  
    if (!product) {  
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn
    });
  }
  ).catch(err => {
    console.log(err);
    // Handle the error appropriately
  });
  // Product.findAll().then(products => {
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
 
    Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save();
  })
  .then(result => {
    console.log('Updated Product!');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
    // Handle the error appropriately
  });
};

exports.getProducts = (req, res, next) => {
  Product.find()
  // .select('title price _id imageUrl')
  // .populate('userId', 'name')
  // .populate('userId') 
  .then(products => {
  
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isAuthenticated: req.session.isLoggedIn
    });
}).catch(err => {
  console.log(err);
  // Handle the error appropriately
})
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // Product.deleteById(prodId);
  // Product.findByPk(prodId)
  Product.findByIdAndDelete(prodId)
  .then(() => {
    console.log('DESTROYED PRODUCT');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
    // Handle the error appropriately
  });
};
