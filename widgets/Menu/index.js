// hooks
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

// components
import { Grid } from "../../components";

// utils
import { capitalizeFirstLetter } from "../../utils";

// actions
import { MenuAction, AuthAction } from "../../store";

// styles
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledMenu = styled.section`
  width: 50%;
  height: 100vh;
  
  overflow-y: scroll;
  position: absolute;
  z-index: 999;

  top: 4rem;
  left: ${({open}) => open ? '50vw' : '100vw'};
  
  display: ${({open}) => open ? 'flex' : 'none'};
  flex-flow: column wrap;
  
  background-color: white;
  box-shadow: ${({open}) => open ? '-25vw 0 50vw black' : '0'};
  padding: 1rem 2rem;

  transition: all .2s;

  a {
    font-weight: bold;
  }
  
`


export const Menu = ({ open }) => {
  
  const [selected, setSelected] = useState({
    gender_ids: new Set(),
    category_ids: new Set()
  });

  const toggleSelected = (key, id) => {
    
    if(selected[key].has(id)){
      selected[key].delete(id)
      setSelected({
        ...selected,
        [key]: selected[key]
      })
    
    } else {
      selected[key].add(id)
      setSelected({
        ...selected,
        [key]: selected[key]
      });
    }
  }

  const {menu, auth} = useSelector(s => {
    return {
      menu: s.menu,
      auth: s.auth
    }

  });
  const dispatch = useDispatch();
  const router = useRouter();

  return (
  <StyledMenu
    open={open}
  >
    <Grid
      direction="column wrap"
      gap="1rem"
    >
      <Grid>

        {!auth.status.loggedIn && (
          <button>Sign Up</button>
        )}

        <button
          onClick={() => {
            if(auth.status.loggedIn){
              dispatch(AuthAction.logout());
            } else {
              dispatch(MenuAction.toggleOpen());
              router.push('/auth/login');
            }
          }}
        >
          {auth.status.loggedIn ? 'logout' : 'login'}
        </button>

      </Grid>


      {
        menu.genders.length > 0 &&
        menu.genders.map(gender => {
          return (
          <Grid
            key={gender.gender_id}
            direction="column wrap"
            gap="1rem"
          >
            <a
              onClick={() => {
                if(!selected.gender_ids.has(gender.gender_id)){
                  dispatch(MenuAction.findCategoriesByGenderId(gender.gender_id))
                }
                toggleSelected('gender_ids', gender.gender_id);
              }}
            >{selected.gender_ids.has(gender.gender_id) ? '^' : 'v'} {capitalizeFirstLetter(gender.name)}</a>
            
            {selected.gender_ids.has(gender.gender_id) && (
              <Grid
                direction="column wrap"
                gap="1rem"
                padding="0 0 0 1rem"        
              >
                
                <a
                  href={`/shop/${gender.name}/products`}
                >All</a>
                
                
                {gender.categories && gender.categories.length > 0 && gender.categories.map(cat => {
                  return (
                  <Grid
                    key={cat.category_id}
                    direction="column wrap"
                    gap="1rem"
                  >
                    <a
                      onClick={() => {
                        if(!selected.category_ids.has(cat.category_id)){
                          dispatch(MenuAction.findSubCategoriesByCategoryId(cat.category_id))
                        }
                        toggleSelected('category_ids', cat.category_id);
                      }}
                    >{selected.category_ids.has(cat.category_id) ? '^' : 'v'} {capitalizeFirstLetter(cat.name)}</a>

                    {selected.category_ids.has(cat.category_id) && (
                      <Grid
                        direction="column wrap"
                        gap="1rem"
                        padding="0 0 0 1rem"
                      >
                        
                        <a
                          href={`/shop/${gender.name}/categories/${cat.category_id}/products`}
                        >All</a>
                        
                        {cat.sub_categories && cat.sub_categories.length > 0 && cat.sub_categories.map(sub_cat => {
                          return (
                            <a
                              key={sub_cat.sub_category_id}
                              href={`/shop/${gender.name}/categories/${cat.category_id}/sub_categories/${sub_cat.sub_category_id}/products`}
                            >{sub_cat.name}</a>
                          )
                        })}
                      </Grid>
                    )}

                  </Grid>
                  )
                })}
              </Grid>
            )}
          
          </Grid>
          )
        })
      }
    </Grid>
  </StyledMenu>
  )
}