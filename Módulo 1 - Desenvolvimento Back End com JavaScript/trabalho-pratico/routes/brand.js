import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

async function getBrands() {
  const data = await fs.readFile('car-list.json');

  return JSON.parse(data);
}

router.get('/maisModelos', async (req, res) => {
  try {
    const brands = await getBrands();
    let result = [];
    let max = 0;

    for (const b of brands) {
      if (b.models.length > max) {
        result = [];
        result.push(b.brand);
        max = b.models.length;
      } else if (b.models.length === max) {
        result.push(b.brand);
      }
    }

    if (result.length === 1) {
      res.send(result[0]);
    } else {
      res.send(result);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/listaMaisModelos/:qtd', async (req, res) => {
  try {
    const brands = await getBrands();

    brands.sort((a, b) => {
      if (a.models.length === b.models.length) {
        return a.brand.localeCompare(b.brand);
      }

      return b.models.length - a.models.length;
    });

    res.send(
      brands
        .slice(0, parseInt(req.params.qtd))
        .map((b) => `${b.brand} - ${b.models.length}`)
    );
  } catch (err) {
    console.log(err);
  }
});

export default router;
