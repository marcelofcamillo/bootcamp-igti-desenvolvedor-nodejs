import Product from '../models/product.model.js';

async function createProduct(product) {
  try {
    return await Product.create(product);
  } catch (error) {
    throw error;
  }
}

async function getProducts() {
  try {
    return await Product.findAll();
  } catch (error) {
    throw error;
  }
}

async function getProduct(id) {
  try {
    return await Product.findByPk(id);
  } catch (error) {
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    await Product.destroy({ where: { productId: id } });
  } catch (error) {
    throw error;
  }
}

async function updateProduct(product) {
  try {
    await Product.update(product, {
      where: { productId: product.productId },
    });

    return await getProduct(product.productId);
  } catch (error) {
    throw error;
  }
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
