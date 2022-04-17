import express from 'express';
import cors from 'cors';
import AccountController from '../controllers/account.controller.js';

const router = express();

router.post('/', AccountController.createAccount);
router.get('/', cors(), AccountController.getAccounts);
router.get('/:id', AccountController.getAccount);
router.delete('/:id', AccountController.deleteAccount);
router.put('/', AccountController.updateAccount);
router.patch('/updateBalance', AccountController.updateBalance);

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
