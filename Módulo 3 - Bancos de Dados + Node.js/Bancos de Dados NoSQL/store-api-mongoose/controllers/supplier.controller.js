import SupplierService from '../services/supplier.service.js';

async function createSupplier(req, res, next) {
  try {
    let supplier = req.body;

    // prettier-ignore
    if (!supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
      throw new Error('name, cnpj, phone, email e address são obrigatórios.');
    }

    res.send(await SupplierService.createSupplier(supplier));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(supplier)}`);
  } catch (error) {
    next(error);
  }
}

async function getSuppliers(req, res, next) {
  try {
    res.send(await SupplierService.getSuppliers());
    logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
}

async function getSupplier(req, res, next) {
  try {
    res.send(await SupplierService.getSupplier(req.params.id));
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function deleteSupplier(req, res, next) {
  try {
    await SupplierService.deleteSupplier(req.params.id);

    res.end();
    logger.info(`${req.method} ${req.baseUrl} - id: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
}

async function updateSupplier(req, res, next) {
  try {
    let supplier = req.body;

    // prettier-ignore
    if (!supplier.supplierId || !supplier.name || !supplier.cnpj || !supplier.phone || !supplier.email || !supplier.address) {
      throw new Error('supplierId, name, cnpj, phone, email e address são obrigatórios.');
    }

    res.send(await SupplierService.updateSupplier(supplier));
    logger.info(`${req.method} ${req.baseUrl} - ${JSON.stringify(supplier)}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
