import SaleService from '../services/sale.service.js';

async function createSale(req, res, next) {
  try {
    let sale = req.body;

    // prettier-ignore
    if (!sale.value || !sale.date || !sale.clientId || !sale.productId) {
      throw new Error('Value, date, clientId e productId são obrigatórios.');
    }

    res.status(200).send(await SaleService.createSale(sale));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(sale)}`);
  } catch (error) {
    next(error);
  }
}

async function getSales(req, res, next) {
  try {
    res
      .status(200)
      .send(
        await SaleService.getSales(req.query.productId, req.query.supplierId)
      );
    logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
}

async function getSale(req, res, next) {
  try {
    res.status(200).send(await SaleService.getSale(req.params.id));
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteSale(req, res, next) {
  try {
    await SaleService.deleteSale(req.params.id);

    res.status(200).end();
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updateSale(req, res, next) {
  try {
    let sale = req.body;

    // prettier-ignore
    if (!sale.saleId || !sale.value || !sale.date || !sale.clientId || !sale.productId) {
      throw new Error('Sale ID, value, date, clientId e productId são obrigatórios.');
    }

    res.status(200).send(await SaleService.updateSale(sale));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
