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
    case ACTION.FIND.CATEGORIES.BY.GENDER.ID.START:
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
    case ACTION.FIND.CATEGORIES.BY.GENDER.ID.SUCCESS:
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
        genders: [
          ...state.genders.map(gender => {
            if(action.payload.gender_id === gender.gender_id){
              gender.categories = action.payload.categories;
            }
            return gender
          })
        ]
      }
    case ACTION.FIND.CATEGORIES.BY.GENDER.ID.FAIL:
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
    
    case ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.START:
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
    case ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        genders: [
          ...state.genders.map(gender => {
            if(gender.categories && gender.categories.length > 0){
              const categoriesToUse = gender.categories.map(category => {
                if(category.category_id === action.payload.category_id){
                  category.sub_categories = action.payload.sub_categories
                }
                
                return category;
              });
              
              return {
                ...gender,
                categories: categoriesToUse
              }
            } else {
              return gender;
            }
          })
        ]
      }
    case ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.FAIL:
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
      }

    case ACTION.FIND.CATEGORIES.BY.GENDER.ID.LIST.START:
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
    case ACTION.FIND.CATEGORIES.BY.GENDER.ID.LIST.SUCCESS:
      const gendersWithCategories = action.payload.gender_ids.map((gender_id, gender_id_index) => {
        let [ gender ] = state.genders.filter(gender => gender.gender_id === gender_id);
        gender.categories = action.payload.categories[gender_id_index];
        return gender;
      });
    
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: {
            ...state.status.error,
            message: ''
          }
        },
        genders: gendersWithCategories.sort((a,b) => a.gender_id - b.gender_id)
      }
    case ACTION.FIND.CATEGORIES.BY.GENDER.ID.LIST.FAIL:
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
      }
    case ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.LIST.START:
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
    case ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.LIST.SUCCESS:
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
    case ACTION.FIND.SUB_CATEGORIES.BY.CATEGORY.ID.LIST.FAIL:
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
      }
    default:
      return state;
  }
}