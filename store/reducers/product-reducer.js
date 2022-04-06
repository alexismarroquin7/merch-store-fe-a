import { ProductAction } from "../actions";

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: [],
  item: {},
  product_images: []
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
    case ProductAction.UPDATE.BY.PRODUCT.ID.SUCCESS:
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
        item: {
          ...state.item,
          ...action.payload.product
        },
        list: state.list.map(product => {
          if(product.product_id === action.payload.product.product_id) {
            return action.payload.product;
          } else {
            return product;
          }
        })
      };
    case ProductAction.UPDATE.BY.PRODUCT.ID.FAIL:
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
    
    case ProductAction.FIND.IMAGES.BY.PRODUCT_IMAGE.ID.START:
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
    case ProductAction.FIND.IMAGES.BY.PRODUCT_IMAGE.ID.SUCCESS:
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
        product_images: action.payload.product_images
      }
    case ProductAction.FIND.IMAGES.BY.PRODUCT_IMAGE.ID.FAIL:
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