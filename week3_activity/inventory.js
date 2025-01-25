// src/inventory.js
const inventory = [
  { id: 1, category: 'Vehicles', make: 'Toyota', model: 'Corolla', year: 2020, price: 20000, mileage: 15000 },
  // Existing inventory...

  // New categories
  { id: 101, category: 'Tents', name: '4-Person Dome Tent', price: 120, stock: 50 },
  { id: 102, category: 'Tents', name: '2-Person Backpacking Tent', price: 90, stock: 30 },
  { id: 201, category: 'Backpacks', name: 'Hiking Backpack', price: 70, stock: 40 },
  { id: 202, category: 'Backpacks', name: 'Travel Backpack', price: 60, stock: 35 },
  { id: 301, category: 'Sleeping Bags', name: 'Down Sleeping Bag', price: 150, stock: 25 },
  { id: 302, category: 'Sleeping Bags', name: 'Synthetic Sleeping Bag', price: 100, stock: 20 },
  { id: 401, category: 'Hammocks', name: 'Single Hammock', price: 50, stock: 45 },
  { id: 402, category: 'Hammocks', name: 'Double Hammock', price: 80, stock: 30 },
];

const getVehicleById = (id) => {
  if (typeof id !== 'number') throw new Error('ID must be a number');
  return inventory.find((item) => item.id === id) || null;
};

module.exports = { inventory, getVehicleById };
