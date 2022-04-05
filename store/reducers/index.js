import { combineReducers } from "redux";
import { inventoryReducer } from "./inventory-reducer";
import { menuReducer } from "./menu-reducer";
import { authReducer } from "./auth-reducer";
import { productReducer } from "./product-reducer";

export const rootReducer = combineReducers({
  inventory: inventoryReducer,
  menu: menuReducer,
  auth: authReducer,
  product: productReducer
})