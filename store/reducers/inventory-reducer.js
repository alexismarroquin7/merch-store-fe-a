import { InventoryAction } from "..";

const initialState = {
  status: {
    loading: false
  }
}

export const inventoryReducer = (state = initialState, action) => {
  switch(action.type){
    case InventoryAction.ACTION.FIND.ALL.START:
      return {
        ...state,
        loading: true
      }
    case InventoryAction.ACTION.FIND.ALL.SUCCESS:
      return {
        ...state,
        loading: false
      }
    case InventoryAction.ACTION.FIND.ALL.FAIL:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}