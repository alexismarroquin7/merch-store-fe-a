import { combineReducers } from "redux";
import { inventoryReducer } from "./inventory-reducer";
import { menuReducer } from "./menu-reducer";

export const rootReducer = combineReducers({
  inventory: inventoryReducer,
  menu: menuReducer
})