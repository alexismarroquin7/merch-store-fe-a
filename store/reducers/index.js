import { combineReducers } from "redux";
import { inventoryReducer } from "./inventory-reducer";
import { menuReducer } from "./menu-reducer";
import { authReducer } from "./auth-reducer";
import { productReducer } from "./product-reducer";
import { imageReducer } from "./image-reducer";

export const rootReducer = combineReducers({
  inventory: inventoryReducer,
  menu: menuReducer,
  auth: authReducer,
  product: productReducer,
  image: imageReducer
})