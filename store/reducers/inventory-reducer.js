import { InventoryAction } from "../actions";

const { ACTION } = InventoryAction;

const initialState = {
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  list: [],
  item: {
    inventory_images: []
  },
  product: {},
  inventory_images: []
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
        },
        list: action.payload.inventory
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
    
    case ACTION.FIND.BY.PRODUCT.ID.START:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        product: {}
      }
    case ACTION.FIND.BY.PRODUCT.ID.SUCCESS:
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
        product: action.payload.product
      }
    case ACTION.FIND.BY.PRODUCT.ID.FAIL:
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
    
    case ACTION.FIND.ALL.START:
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
    case ACTION.FIND.ALL.SUCCESS:
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
        list: action.payload.inventory
      };
    case ACTION.FIND.ALL.FAIL:
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
    
    case ACTION.FIND.IMAGES.BY.INVENTORY.ID.START:
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
    case ACTION.FIND.IMAGES.BY.INVENTORY.ID.SUCCESS:
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
        inventory_images: action.payload.inventory_images

      }
    case ACTION.FIND.IMAGES.BY.INVENTORY.ID.FAIL:
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
    
    case ACTION.FIND.BY.INVENTORY.ID.START:
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
    case ACTION.FIND.BY.INVENTORY.ID.SUCCESS:
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
        item: action.payload.inventoryItem
      }
    case ACTION.FIND.BY.INVENTORY.ID.FAIL:
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

    case ACTION.DELETE.INVENTORY_IMAGE.BY.INVENTORY_IMAGE.ID.START:
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
    case ACTION.DELETE.INVENTORY_IMAGE.BY.INVENTORY_IMAGE.ID.SUCCESS:
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
          inventory_images: state.item.inventory_images.filter(inv_img => inv_img.inventory_image_id !== Number(action.payload.inventory_image_id))
        }
      }
    case ACTION.DELETE.INVENTORY_IMAGE.BY.INVENTORY_IMAGE.ID.FAIL:
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

    case ACTION.CREATE.INVENTORY_IMAGE.START:
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
    case ACTION.CREATE.INVENTORY_IMAGE.SUCCESS:
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
          inventory_images: [...state.item.inventory_images, action.payload.inventory_image]
        }
      }
    case ACTION.CREATE.INVENTORY_IMAGE.FAIL:
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


    default:
      return state;
  }
}