import express from 'express';
import brandRouter from './routes/brand.js';

const app = express();
app.use('/marcas', brandRouter);

app.listen(3000, () => console.log('API started!'));
