import { axiosInstance as axios } from "../../utils";
const ACTION = {
  LOGIN: {
    START: "AUTH__LOGIN--START",
    SUCCESS: "AUTH__LOGIN--SUCCESS",
    FAIL: "AUTH__LOGIN--FAIL"
  },
  LOGOUT: {
    START: "AUTH__LOGOUT--START",
    SUCCESS: "AUTH__LOGOUT--SUCCESS",
    FAIL: "AUTH__LOGOUT--FAIL"
  },
}

const login = (credentials) => async dispatch => {
  dispatch({
    type: ACTION.LOGIN.START
  });
  
  try {
    const res = await axios().post('/auth/login', credentials);
    dispatch({
      type: ACTION.LOGIN.SUCCESS,
      payload: {
        user: res.data.user,
        token: res.data.token,
        message: res.data.message
      }
    });
    
  } catch (err) {
    
    dispatch({
      type: ACTION.LOGIN.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    });

  }
}

const logout = () => async dispatch => {
  dispatch({
    type: ACTION.LOGOUT.START
  });
  
  try {
    dispatch({
      type: ACTION.LOGOUT.SUCCESS
    });
    
  } catch (err) {
    dispatch({
      type: ACTION.LOGOUT.FAIL
    });

  }
}

export const AuthAction = {
  ...ACTION,
  login,
  logout
}