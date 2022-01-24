import { combineReducers } from "redux";
import { inventoryReducer } from "./inventory-reducer";

export const rootReducer = combineReducers({
  inventory: inventoryReducer
})