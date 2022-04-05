import { axiosInstance as axios } from "../../utils";

const ACTION = {
  FIND: {
    ALL: {
      START: "INVENTORY__FIND__ALL--START",
      SUCCESS: "INVENTORY__FIND__ALL--SUCCESS",
      FAIL: "INVENTORY__FIND__ALL--FAIL"
    },
    IMAGES: {
      BY: {
        INVENTORY: {
          ID: {
            START: "INVENTORY__FIND__IMAGES__BY__INVENTORY__ID---START",
            SUCCESS: "INVENTORY__FIND__IMAGES__BY__INVENTORY__ID---SUCCESS",
            FAIL: "INVENTORY__FIND__IMAGES__BY__INVENTORY__ID---FAIL"
          }
        }
      }
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
    type: ACTION.FIND.ALL.START,
    
  });
  try {
    const res = await axios().get('/inventory');
    dispatch({
      type: ACTION.FIND.ALL.SUCCESS,
      payload: {
        inventory: res.data
      }
    });
  } catch (err) {
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
    const res = await axios().get('/inventory');

    const inventory = res.data
    .filter(inv_item => inv_item.product.product_id === Number(product_id));
    
    let product = {
      colors: [],
      gender: {},
      category: {},
      sub_category: {}
    };

    const colorSet = new Set();
    
    inventory.forEach(inventory_item => {
      if(!product.product_id){
        product = {
          ...product,
          ...inventory_item.product,
          gender: {
            ...inventory_item.gender
          },
          category: {
            ...inventory_item.category
          },
          sub_category: {
            ...inventory_item.sub_category
          }
        };
      }

      if(!colorSet.has(inventory_item.color.color_id)){
        product.colors.push({
          ...inventory_item.color,
          sizes: [
            {
              ...inventory_item.size,
              inventory_id: inventory_item.inventory_id,
              inventory_images: inventory_item.inventory_images,
              amount_in_stock: inventory_item.amount_in_stock
            }
          ]
        });
        colorSet.add(inventory_item.color.color_id);
      } else {
        product.colors = product.colors.map(color => {
          if(color.color_id === inventory_item.color.color_id){
            color.sizes.push({
              ...inventory_item.size,
              inventory_id: inventory_item.inventory_id,
              inventory_images: inventory_item.inventory_images,
              amount_in_stock: inventory_item.amount_in_stock
            });
          }

          return color;
        })
      }

    });
    
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

const findImagesByInventoryId = () => async dispatch => {
  dispatch({
    type: ACTION.FIND.IMAGES.BY.INVENTORY.ID.START
  })
  
  try {

    const res = await axios().get(`/inventory_images`);
    console.log('🙂', res);
    dispatch({
      type: ACTION.FIND.IMAGES.BY.INVENTORY.ID.SUCCESS,
      payload: {

      }
    })
  } catch (err) {
    console.log('😭', err)
    dispatch({
      type: ACTION.FIND.IMAGES.BY.INVENTORY.ID.FAIL,
      payload: {
        error: {
          message: err.response.data.message 
        }
      }
    })
  }

};

export const InventoryAction = {
  ACTION,
  findAll,
  findBySubCategoryId,
  findByProductId,
  findImagesByInventoryId
}