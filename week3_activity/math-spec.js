// tests/inventory.test.js
const { getVehicleById, inventory } = require('../src/inventory');

describe('getVehicleById', () => {
  test('should return the correct vehicle when a valid ID is provided', () => {
    const result = getVehicleById(1);
    expect(result).toEqual({ id: 1, make: 'Toyota', model: 'Corolla', year: 2020, price: 20000, mileage: 15000 });
  });

  test('should return null if the ID does not exist in the inventory', () => {
    const result = getVehicleById(999);
    expect(result).toBeNull();
  });

  test('should throw an error if the ID is not a number', () => {
    expect(() => getVehicleById('1')).toThrow('ID must be a number');
    expect(() => getVehicleById(null)).toThrow('ID must be a number');
  });

  test('should handle edge cases for IDs', () => {
    const maxId = Math.max(...inventory.map((item) => item.id));
    expect(getVehicleById(maxId)).toEqual(inventory.find((item) => item.id === maxId));

    const minId = Math.min(...inventory.map((item) => item.id));
    expect(getVehicleById(minId)).toEqual(inventory.find((item) => item.id === minId));
  });
});

// routes/products.js
const express = require('express');
const { inventory } = require('../src/inventory');
const router = express.Router();

// Search by term
router.get('/search/:term', (req, res) => {
  const term = req.params.term.toLowerCase();
  const results = inventory.filter(
    (item) => item.name?.toLowerCase().includes(term) || item.category.toLowerCase().includes(term)
  );
  res.json(results);
});

// Get product by ID
router.get('/id/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = inventory.find((item) => item.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;

