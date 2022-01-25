import { InventoryAction } from "../actions";

const { ACTION } = InventoryAction;

const initialState = {
  status: {
    loading: false,
  },
  list: []
}

export const inventoryReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTION.FIND.BY.SUB_CATEGORY.ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    case ACTION.FIND.BY.SUB_CATEGORY.ID.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        }
      }
    case ACTION.FIND.BY.SUB_CATEGORY.ID.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: action.payload.error.message
          }
        }
      }
    default:
      return state;
  }
}