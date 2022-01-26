import { axiosInstance as axios } from "../../utils";

const ACTION = {
  FIND: {
    ALL: {
      START: "INVENTORY__FIND__ALL--START",
      SUCCESS: "INVENTORY__FIND__ALL--SUCCESS",
      FAIL: "INVENTORY__FIND__ALL--FAIL"
    },
    BY: {
      SUB_CATEGORY: {
        ID: {
          START: "INVENTORY__FIND__BY__SUB_CATEGORY__ID--START",
          SUCCESS: "INVENTORY__FIND__BY__SUB_CATEGORY__ID--SUCCESS",
          FAIL: "INVENTORY__FIND__BY__SUB_CATEGORY__ID--FAIL"
        }
      },
      PRODUCT: {
        ID: {
          START: "INVENTORY__FIND__BY__PRODUCT__ID--START",
          SUCCESS: "INVENTORY__FIND__BY__PRODUCT__ID--SUCCESS",
          FAIL: "INVENTORY__FIND__BY__PRODUCT__ID--FAIL"
        }
      }
    }
  }
}

const findAll = () => async dispatch => {
  dispatch({
    type: ACTION.FIND.ALL.START
  });
  try {
    dispatch({
      type: ACTION.FIND.ALL.SUCCESS
    });
  } catch (err) {
    dispatch({
      type: ACTION.FIND.ALL.FAIL
    });
  }
}

const findBySubCategoryId = (sub_category_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.SUB_CATEGORY.ID.START
  });
  try {
    const res = await axios().get('/inventory?groupBy=products');
    const inventory = res.data.filter(product => {
      return product.sub_category.sub_category_id === sub_category_id;
    });
    
    dispatch({
      type: ACTION.FIND.BY.SUB_CATEGORY.ID.SUCCESS,
      payload: {
        inventory
      }
    });
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.SUB_CATEGORY.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message || err.message
        }
      }
    });
  }
};

const findByProductId = (product_id) => async dispatch => {
  dispatch({
    type: ACTION.FIND.BY.PRODUCT.ID.START
  })

  try {
    const res = await axios().get('/inventory?groupBy=products');
    const [product] = res.data.filter(product => product.product_id === Number(product_id));
    dispatch({
      type: ACTION.FIND.BY.PRODUCT.ID.SUCCESS,
      payload: {
        product
      }
    })
    
  } catch (err) {
    dispatch({
      type: ACTION.FIND.BY.PRODUCT.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message || err.message
        }
      }
    })
  }
}

export const InventoryAction = {
  ACTION,
  findAll,
  findBySubCategoryId
}