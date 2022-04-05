import { ProductAction } from "../actions";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: [],
  item: {}
}

export const productReducer = (state = initialState, action) => {

  switch(action.type){
    case ProductAction.FIND.ALL.START:
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
      };
    case ProductAction.FIND.ALL.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        list: action.payload.products
      };
    case ProductAction.FIND.ALL.FAIL:
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
      };

    case ProductAction.UPDATE.BY.PRODUCT.ID.START:
      return state;
    case ProductAction.UPDATE.BY.PRODUCT.ID.SUCCESS:
      return state;
    case ProductAction.UPDATE.BY.PRODUCT.ID.FAIL:
      return state;
    
    case ProductAction.DELETE.PROUDCT_IMAGE.BY.PRODUCT_IMAGE_ID.START:
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
      };
    case ProductAction.DELETE.PROUDCT_IMAGE.BY.PRODUCT_IMAGE_ID.SUCCESS:
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
      };
    case ProductAction.DELETE.PROUDCT_IMAGE.BY.PRODUCT_IMAGE_ID.FAIL:
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
      };

    case ProductAction.FIND.BY.PRODUCT.ID.START:
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
      };
    case ProductAction.FIND.BY.PRODUCT.ID.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        item: action.payload.product
      };
    case ProductAction.FIND.BY.PRODUCT.ID.FAIL:
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
      };

    default:
      return state;
  }
}