import { v4 as uuidv4 } from 'uuid';
import { products } from './products';
import { sizes } from './sizes';
import { colors } from './colors';
import { images } from './images';

export const inventory = [
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[0],
    color: colors[0],
    images: [
      images[0]
    ]
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[1],
    color: colors[0],
    images: [
      images[0]
    ]
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[2],
    color: colors[0],
    images: [
      images[0]
    ]
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[0],
    color: colors[1],
    images: [
      images[1]
    ]
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[1],
    color: colors[1],
    images: [
      images[1]
    ]
  },
  {
    inventory_id: uuidv4(),
    product: products[0],
    size: sizes[2],
    color: colors[1],
    images: [
      images[1]
    ]
  },
]

export const Inventory = {
  findAll: () => inventory,
  findById: (inventory_id) => inventory.filter(inventory_item => inventory_item.inventory_id === inventory_id)[0]
}