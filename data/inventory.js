import { v4 as uuidv4 } from 'uuid';
import { products } from './products';
import { sizes } from './sizes';
import { colors } from './colors';

export const inventory = [
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[0],
    price: 35.00,
    color: colors[0]
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[1],
    price: 35.00,
    color: colors[0],
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[2],
    price: 35.00,
    color: colors[0],
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[0],
    price: 35.00,
    color: colors[1]
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[1],
    price: 35.00,
    color: colors[1],
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[2],
    price: 35.00,
    color: colors[1],
  },
]

export const Inventory = {
  findAll: () => inventory,
  findById: (inventory_id) => inventory.filter(inventory_item => inventory_item.inventory_id === inventory_id)[0]
}