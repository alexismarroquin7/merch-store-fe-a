import { v4 as uuidv4 } from 'uuid';
import { categories } from './categories';
import { genders } from './genders';
import { sub_categories } from './sub_categories';

export const sizes = [
  {
    size_id: uuidv4(),
    name: "S",
    category: categories[0],
    sub_category: sub_categories[0],
    gender: genders[0]
  },
  {
    size_id: uuidv4(),
    name: "M",
    category: categories[0],
    sub_category: sub_categories[0],
    gender: genders[0]
  },
  {
    size_id: uuidv4(),
    name: "L",
    category: categories[0],
    sub_category: sub_categories[0],
    gender: genders[0]
  },
  {
    size_id: uuidv4(),
    name: "32x32",
    category: categories[1],
    sub_category: sub_categories[2],
    gender: genders[0]
  },
]