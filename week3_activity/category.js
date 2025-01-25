// routes/category.js
const express = require('express');
const { inventory } = require('../src/inventory');
const router = express.Router();

router.get('/:category', (req, res) => {
  const category = req.params.category;
  const products = inventory.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  if (products.length === 0) return res.status(404).json({ error: 'Category not found' });
  res.json(products);
});

module.exports = router;
