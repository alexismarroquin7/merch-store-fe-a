import { MenuAction } from "../actions/menu-actions";

const { ACTION } = MenuAction;

const initialState = {
  open: false,
  status: {
    loading: false,
    error: {
      message: ''
    }
  },
  genders: []
}

export const menuReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTION.TOGGLE_OPEN:
      return {
        ...state,
        open: !state.open
      };
    case ACTION.FIND.ALL.GENDERS.START:
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
    case ACTION.FIND.ALL.GENDERS.SUCCESS:
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
        genders: action.payload.genders
      };
    case ACTION.FIND.ALL.GENDERS.FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
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