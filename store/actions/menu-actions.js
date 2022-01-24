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
            START: "MENU__FIND__CATEGORIES__BY__GENDER__ID--START",
            SUCCESS: "MENU__FIND__CATEGORIES__BY__GENDER__ID--SUCCESS",
            FAIL: "MENU__FIND__CATEGORIES__BY__GENDER__ID--FAIL",
            LIST: {
              START: "MENU__FIND__CATEGORIES__BY__GENDER__ID__LIST--START",
              SUCCESS: "MENU__FIND__CATEGORIES__BY__GENDER__ID__LIST--SUCCESS",
              FAIL: "MENU__FIND__CATEGORIES__BY__GENDER__ID__LIST--FAIL"
            }
          }
        }
      }
    },

    SUB_CATEGORIES: {
      BY: {
        CATEGORY: {
          ID: {
            START: "MENU__FIND__SUB_CATEGORIES__BY__CATEGORY__ID--START",
            SUCCESS: "MENU__FIND__SUB_CATEGORIES__BY__CATEGORY__ID--SUCCESS",
            FAIL: "MENU__FIND__SUB_CATEGORIES__BY__CATEGORY__ID--FAIL",
            LIST: {
              START: "MENU__FIND__SUB_CATEGORIES__BY__CATEGORY__ID__LIST--START",
              SUCCESS: "MENU__FIND__SUB_CATEGORIES__BY__CATEGORY__ID__LIST--SUCCESS",
              FAIL: "MENU__FIND__SUB_CATEGORIES__BY__CATEGORY__ID__LIST--FAIL",
            }
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
      payload: {
        categories: filteredByGenderId,
        gender_id
      }
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

const findCategoriesByGenderIdList = (gender_ids = []) => async dispatch => {
  dispatch({
    type: ACTION.FIND.CATEGORIES.BY.GENDER.ID.LIST.START
  })

  try {
    const res = await axios().get('/categories')

    const categories = gender_ids.map(gender_id => {
      const result = res.data.filter(cat => {
        return cat.gender.gender_id === Number(gender_id)
      })
      return result;
    });

    dispatch({
      type: ACTION.FIND.CATEGORIES.BY.GENDER.ID.LIST.SUCCESS,
      payload: {
        categories,
        gender_ids
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.FIND.CATEGORIES.BY.GENDER.ID.LIST.FAIL,
      payload: {
        error: {
          message: err.response.data.message || err
        }
      }
    })
  }
}

const findSubCategoriesByCategoryId = (category_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.START
  })
  
  try {
    const res = await axios().get('/sub_categories');
    const sub_categories = res.data.filter(sub_category => sub_category.category.category_id === category_id)

    dispatch({
      type: ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.SUCCESS,
      payload: {
        sub_categories,
        category_id
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.FAIL,
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
  findAllGenders,
  findCategoriesByGenderId,
  findCategoriesByGenderIdList,
  findSubCategoriesByCategoryId
}