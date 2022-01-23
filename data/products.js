import { v4 as uuidv4 } from 'uuid';
import { categories } from "./categories"
import { sub_categories } from "./sub_categories"
import { genders } from './genders';
// import { images } from './images';
// import { colors } from './colors';

export const products = [
  {
    product_id: uuidv4(),
    name: "Classic Logo Shirt",
    category: categories[0],
    sub_category: sub_categories[0],
    gender: genders[0],
    price: 35.00
  }
]