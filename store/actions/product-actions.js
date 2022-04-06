import { axiosInstance as axios } from "../../utils"

const ACTION = {
  FIND: {
    ALL: {
      START: "PRODUCT__FIND__ALL--START",
      SUCCESS: "PRODUCT__FIND__ALL--SUCCESS",
      FAIL: "PRODUCT__FIND__ALL--FAIL"
    },
    BY: {
      PRODUCT: {
        ID: {
          START: "PRODUCT__FIND__BY__PRODUCT__ID--START",
          SUCCESS: "PRODUCT__FIND__BY__PRODUCT__ID--SUCCESS",
          FAIL: "PRODUCT__FIND__BY__PRODUCT__ID--FAIL"
        }
      }
    },
    IMAGES: {
      BY: {
        PRODUCT_IMAGE: {
          ID: {
            START: "PRODUCT__FIND__PRODUCT_IMAGE__ID--START",
            SUCCESS: "PRODUCT__FIND__PRODUCT_IMAGE__ID--SUCCESS",
            FAIL: "PRODUCT__FIND__PRODUCT_IMAGE__ID--FAIL"
          }
        }
      }
    }
  },
  UPDATE: {
    BY: {
      PRODUCT: {
        ID: {
          START: "PRODUCT__UPDATE__BY__PRODUCT__ID--START",
          SUCCESS: "PRODUCT__UPDATE__BY__PRODUCT__ID--SUCCESS",
          FAIL: "PRODUCT__UPDATE__BY__PRODUCT__ID--FAIL"
        }
      }
    }
  },
  DELETE: {
    PROUDCT_IMAGE: {
      BY: {
        PRODUCT_IMAGE_ID: {
          START: "PRODUCT__DELETE_PRODUCT_IMAGE__BY__PRODUCT_IMAGE_ID--START",
          SUCCESS: "PRODUCT__DELETE_PRODUCT_IMAGE__BY__PRODUCT_IMAGE_ID--SUCCESS",
          FAIL: "PRODUCT__DELETE_PRODUCT_IMAGE__BY__PRODUCT_IMAGE_ID--FAIL"
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
    const res = await axios().get('/products');
    dispatch({
      type: ACTION.FIND.ALL.SUCCESS,
      payload: {
        products: res.data
      }
    });

  } catch(err) {
    dispatch({
      type: ACTION.FIND.ALL.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    });

  }
}

const updateByProductId = (product_id, changes, original) => async dispatch => {

  const model = {
    name: changes.name || original.name,
    description: changes.description || original.description,
    current_price: changes.current_price || original.current_price,
    valued_at: changes.valued_at || original.valued_at,
    current_price: changes.current_price || original.current_price,
    gender: {
      name: changes.gender && changes.gender.name 
      ? changes.gender.name 
      : original.gender.name
    },
    category: {
      name: changes.category && changes.category.name 
      ? changes.category.name 
      : original.category.name
    },
    sub_category: {
      name: changes.sub_category && changes.sub_category.name 
      ? changes.sub_category.name 
      : original.sub_category.name
    }
  }
  
  dispatch({
    type: ACTION.UPDATE.BY.PRODUCT.ID.START
  })

  try {
    const res = await axios().put(`/products/${product_id}`, model);
    dispatch({
      type: ACTION.UPDATE.BY.PRODUCT.ID.SUCCESS,
      payload: {
        product: res.data
      }
    })
    
  } catch(err) {
    dispatch({
      type: ACTION.UPDATE.BY.PRODUCT.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })

  }
}

const deleteProductImageByProductImageId = (product_image_id) => async dispatch => {
  dispatch({
    type: ACTION.DELETE.PROUDCT_IMAGE.BY.PRODUCT_IMAGE_ID.START
  })

  try {
    const res = await axios().delete(`/product_images/${product_image_id}`);
    dispatch({
      type: ACTION.DELETE.PROUDCT_IMAGE.BY.PRODUCT_IMAGE_ID.SUCCESS
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.DELETE.PROUDCT_IMAGE.BY.PRODUCT_IMAGE_ID.FAIL
    })

  }
}

const findByProductId = (product_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.PRODUCT.ID.START
  })
  
  try {
    const res = await axios().get(`/products/${product_id}`);
    dispatch({
      type: ACTION.FIND.BY.PRODUCT.ID.SUCCESS,
      payload: {
        product: res.data
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.PRODUCT.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })

  }
}

const findImagesByProductId = (product_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.IMAGES.BY.PRODUCT_IMAGE.ID.START
  })

  try {
    const res = await axios().get(`/product_images`);

    const product_images = res.data.filter(p_img => p_img.product_id === Number(product_id));

    dispatch({
      type: ACTION.FIND.IMAGES.BY.PRODUCT_IMAGE.ID.SUCCESS,
      payload: {
        product_images
      }
    })
  } catch (err) {
    dispatch({
      type: ACTION.FIND.IMAGES.BY.PRODUCT_IMAGE.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message
        }
      }
    })
  }
}

export const ProductAction = {
  ...ACTION,
  findAll,
  findByProductId,
  updateByProductId,
  deleteProductImageByProductImageId,
  findImagesByProductId
}