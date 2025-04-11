const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
//   const product = new Product(null, title, imageUrl, description, price);
//   product
//   .save()
//   .then(()=> {
//     res.redirect('/');
//   })
//   .catch(err => console.log(err));
// };
req.user.createProduct(
  {
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description

  }
).then(result => {
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
  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // });

  req.user.getProducts({
    where: {
      id: prodId
    }
  }).then(products => {    const product = products[0];
    if (!product) {  
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
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
  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save();
  }
  ).then(result => {
    console.log('Updated Product!');
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
    // Handle the error appropriately
  });
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
  // Product.findAll()
  req.user.getProducts()
  .then(products => {
  
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
}).catch(err => {
  console.log(err);
  // Handle the error appropriately
})
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // Product.deleteById(prodId);
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  }).then(result => {
    console.log('DESTROYED PRODUCT');
  }).catch(err => {
    console.log(err);
    // Handle the error appropriately
  });
  res.redirect('/admin/products');
};
