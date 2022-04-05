import { AuthAction } from "../actions";

const initialState = {
  status: {
    loading: false,
    loggedIn: false,
    error: {
      message: ''
    }
  },
  user: {},
  token: '',
  message: '',
}

export const authReducer = (state = initialState, action) => {
  switch(action.type){
    case AuthAction.LOGIN.START:
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
    case AuthAction.LOGIN.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          loggedIn: true,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        user: action.payload.user,
        token: action.payload.token,
        message: action.payload.message,
      };
    case AuthAction.LOGIN.FAIL:
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
    case AuthAction.LOGOUT.START:
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
    case AuthAction.LOGOUT.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          loggedIn: initialState.status.loggedIn,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        user: initialState.user,
        token: initialState.token,
        message: initialState.message
      }
    case AuthAction.LOGOUT.FAIL:
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