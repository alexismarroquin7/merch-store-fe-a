import { ImageAction } from "../actions";

const { ACTION } = ImageAction;

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

export const imageReducer = (state = initialState, action) => {
  switch(action.type){
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
      }    
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
        list: action.payload.images
      }    
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
      }    
    case ACTION.FIND.BY.IMAGE.ID.START:
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
    case ACTION.FIND.BY.IMAGE.ID.SUCCESS:
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
        item: action.payload.image
      }    
    case ACTION.FIND.BY.IMAGE.ID.FAIL:
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
    
    case ACTION.UPDATE.BY.IMAGE.ID.START:
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
    case ACTION.UPDATE.BY.IMAGE.ID.SUCCESS:
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
        item: action.payload.item,
        list: state.list.map(image => {
          if(image.image_id === action.payload.image.image_id) {
            return action.payload.image;
          } else {
            return image;
          }
        })
      }
    case ACTION.UPDATE.BY.IMAGE.ID.FAIL:
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