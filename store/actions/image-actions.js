import { axiosInstance as axios } from "../../utils"

const ACTION = {
  FIND: {
    ALL: {
      START: "IMAGE__FIND__ALL--START",
      SUCCESS: "IMAGE__FIND__ALL--SUCCESS",
      FAIL: "IMAGE__FIND__ALL--FAIL",
    },
    BY: {
      IMAGE: {
        ID: {
          START: "IMAGE__FIND__BY__IMAGE__ID--START",
          SUCCESS: "IMAGE__FIND__BY__IMAGE__ID--SUCCESS",
          FAIL: "IMAGE__FIND__BY__IMAGE__ID--FAIL"
        }
      }
    }
  },
  UPDATE: {
    BY: {
      IMAGE: {
        ID: {
          START: "IMAGE__UPDATE__BY__IMAGE_ID--START",
          SUCCESS: "IMAGE__UPDATE__BY__IMAGE_ID--SUCCESS",
          FAIL: "IMAGE__UPDATE__BY__IMAGE_ID--FAIL"
        }
      }
    }
  }
}

const findAll = () => async dispatch => {
  dispatch({
    type: ACTION.FIND.ALL.START
  })
  
  try {
    const res = await axios().get('/images');
    dispatch({
      type: ACTION.FIND.ALL.SUCCESS,
      payload: {
        images: res.data
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.ALL.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
    
  }
}

const findByImageId = (image_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.IMAGE.ID.START
  })
  
  try {
    const res = await axios().get(`/images/${image_id}`);
    dispatch({
      type: ACTION.FIND.BY.IMAGE.ID.SUCCESS,
      payload: {
        image: res.data
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.IMAGE.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
    
  }
}

const updateByImageId = (image_id, changes) => async dispatch => {
  dispatch({
    type: ACTION.UPDATE.BY.IMAGE.ID.START
  })

  try {
    const res = await axios().put(`/images/${image_id}`, {
      name: changes.name,
      title: changes.title,
      src: changes.src,
      alt: changes.alt
    })
    dispatch({
      type: ACTION.UPDATE.BY.IMAGE.ID.SUCCESS,
      payload: {
        image: res.data
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.UPDATE.BY.IMAGE.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

export const ImageAction = {
  ACTION,
  findAll,
  findByImageId,
  updateByImageId
}