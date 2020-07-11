const mongoose = require('mongoose');
const Product = require('../../models/product');

module.exports = {
  products: () =>
    Product.find()
      .then(products => products.map(product => ({ ...product._doc })))
      .catch(err => {
        console.log(err);
        throw err;
      }),

  createProducts: args => {
    // creating a new product
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: args.productInput.name,
      quantity: args.productInput.quantity,
      description: args.productInput.description,
      price: args.productInput.price,
    });

    return product
      .save()
      .then(result => {
        console.log(result);
        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },

  deleteProduct: args => {
    const { id } = args;

    Product.remove({ _id: id })
      .exec()
      .then(result => 'Product was deleted')
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
};
