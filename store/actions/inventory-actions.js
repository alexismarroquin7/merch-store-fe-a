const ACTION = {
  FIND: {
    ALL: {
      START: "INVENTORY__FIND__ALL--START",
      SUCCESS: "INVENTORY__FIND__ALL--SUCCESS",
      FAIL: "INVENTORY__FIND__ALL--FAIL"
    }
  }
}

const findAll = () => async dispatch => {
  try {
    dispatch({
      type: ACTION.FIND.ALL.START
    });
    dispatch({
      type: ACTION.FIND.ALL.SUCCESS
    });
  } catch (err) {
    dispatch({
      type: ACTION.FIND.ALL.FAIL
    });
  }
}

export const InventoryAction = {
  ACTION,
  findAll
}