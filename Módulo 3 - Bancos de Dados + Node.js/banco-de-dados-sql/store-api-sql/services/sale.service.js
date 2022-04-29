import SaleRepository from '../repositories/sale.repository.js';
import ClientRepository from '../repositories/client.repository.js';
import ProductRepository from '../repositories/product.repository.js';

async function createSale(sale) {
  let error = '';

  if (!(await ClientRepository.getClient(sale.client_id))) {
    error = 'O client_id informado não existe.';
  }

  const product = await ProductRepository.getProduct(sale.product_id);

  if (!product) {
    error += 'O product_id informado não existe.';
  }

  if (error) {
    throw new Error(error);
  }

  if (product.stock > 0) {
    sale = await SaleRepository.createSale(sale);
    product.stock--;
    await ProductRepository.updateProduct(product);

    return sale;
  } else {
    throw new Error('O produto informado não possui estoque.');
  }
}

async function getSales() {
  return await SaleRepository.getSales();
}

async function getSale(id) {
  return await SaleRepository.getSale(id);
}

async function deleteSale(id) {
  await SaleRepository.deleteSale(id);
}

async function updateSale(sale) {
  let error = '';

  if (!(await ClientRepository.getClient(sale.client_id))) {
    error = 'O client_id informado não existe.';
  }

  if (!(await ProductRepository.getProduct(sale.product_id))) {
    error += 'O product_id informado não existe.';
  }

  if (error) {
    throw new Error(error);
  }

  return await SaleRepository.updateSale(sale);
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
