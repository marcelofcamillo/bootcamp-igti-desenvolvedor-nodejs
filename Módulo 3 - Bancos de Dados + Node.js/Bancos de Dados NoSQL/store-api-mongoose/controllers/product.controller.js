import ProductService from '../services/product.service.js';

async function createProduct(req, res, next) {
  try {
    let product = req.body;

    // prettier-ignore
    if (!product.name || !product.description || !product.value || !product.stock || !product.supplierId) {
      throw new Error('name, description, value, stock e supplierId são obrigatórios.');
    }

    res.send(await ProductService.createProduct(product));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(product)}`);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    res.send(await ProductService.getProducts());
    logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    res.send(await ProductService.getProduct(req.params.id));
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await ProductService.deleteProduct(req.params.id);

    res.end();
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    let product = req.body;

    // prettier-ignore
    if (!product.productId || !product.name || !product.description || !product.value || !product.stock || !product.supplier_id) {
      throw new Error('productId, name, description, value, stock e supplierId são obrigatórios.');
    }

    res.send(await ProductService.updateProduct(product));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(product)}`);
  } catch (error) {
    next(error);
  }
}

async function createProductInfo(req, res, next) {
  try {
    let productInfo = req.body;

    if (!productInfo.productId) {
      throw new Error('productId é obrigatório.');
    }

    await ProductService.createProductInfo(productInfo);

    res.end();
    logger.info(
      `${req.method} ${req.baseUrl}/info - ${JSON.stringify(productInfo)}`
    );
  } catch (error) {
    next(error);
  }
}

async function updateProductInfo(req, res, next) {
  try {
    let productInfo = req.body;

    if (!productInfo.productId) {
      throw new Error('productId é obrigatório.');
    }

    await ProductService.updateProductInfo(productInfo);

    res.end();
    logger.info(
      `${req.method} ${req.baseUrl}/info - ${JSON.stringify(productInfo)}`
    );
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    let params = req.body;

    if (!params.productId || !params.review) {
      throw new Error('productId e review são obrigatórios.');
    }

    await ProductService.createReview(params.review, params.productId);

    logger.info(`${req.method} ${req.baseUrl}/review`);
    res.end();
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    await ProductService.deleteReview(req.params.id, req.params.index);

    logger.info(
      `${req.method} ${req.baseUrl}/${req.params.id}/review/${req.params.index}`
    );
    res.end();
  } catch (error) {
    next(error);
  }
}

async function getProductsInfo(req, res, next) {
  try {
    res.send(await ProductService.getProductsInfo());
    logger.info(`${req.method} ${req.baseUrl}/info`);
  } catch (error) {
    next(error);
  }
}

async function deleteProductInfo(req, res, next) {
  try {
    res.send(await ProductService.deleteProductInfo(parseInt(req.params.id)));
    logger.info(`${req.method} ${req.baseUrl}/info`);
  } catch (error) {
    next(error);
  }
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProductInfo,
  updateProductInfo,
  createReview,
  deleteReview,
  getProductsInfo,
  deleteProductInfo,
};
