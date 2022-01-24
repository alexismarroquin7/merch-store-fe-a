import { axiosInstance as axios } from "../../utils";

const ACTION = {
  TOGGLE_OPEN: "MENU__TOGGLE_OPEN",
  FIND: {
    ALL: {
      GENDERS: {
        START: "MENU__FIND__ALL__GENDERS--START",
        SUCCESS: "MENU__FIND__ALL__GENDERS--SUCCESS",
        FAIL: "MENU__FIND__ALL__GENDERS--FAIL"
      }, 
    },

    CATEGORIES: {
      BY: {
        GENDER: {
          ID: {
            START: "MENU__FIND__ALL__CATEGORIES__BY__GENDER__ID--START",
            SUCCESS: "MENU__FIND__ALL__CATEGORIES__BY__GENDER__ID--SUCCESS",
            FAIL: "MENU__FIND__ALL__CATEGORIES__BY__GENDER__ID--FAIL"
          }
        }
      }
    }
  }
}

const toggleOpen = () => {
  return {
    type: ACTION.TOGGLE_OPEN
  }
}

const findAllGenders = () => async dispatch => {
  dispatch({
    type: ACTION.FIND.ALL.GENDERS.START
  });
  
  try {
    const res = await axios().get('/genders');
    dispatch({
      type: ACTION.FIND.ALL.GENDERS.SUCCESS,
      payload: {
        genders: res.data
      }
    });
  } catch (err) {
    dispatch({
      type: ACTION.FIND.ALL.GENDERS.FAIL,
      payload: {
        error: {
          message: err.response.data.message || err
        }
      }
    });
    
  }
}

const findCategoriesByGenderId = (gender_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.CATEGORIES.BY.GENDER.ID.START
  })
  try {
    const res = await axios().get('/categories');
    
    const filteredByGenderId = res.data.filter(category => category.gender.gender_id === Number(gender_id));

    dispatch({
      type: ACTION.FIND.CATEGORIES.BY.GENDER.ID.SUCCESS,
      payload: { categories: filteredByGenderId }
    })
  } catch (err) {
    dispatch({
      type: ACTION.FIND.CATEGORIES.BY.GENDER.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message || err
        }
      }
    })

  }
}

export const MenuAction = {
  ACTION,
  toggleOpen,
  findAllGenders
}