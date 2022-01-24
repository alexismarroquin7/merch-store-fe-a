import { useState } from "react"

import { Grid } from "../../components";

import { useDispatch, useSelector } from "react-redux";

import { capitalizeFirstLetter } from "../../utils";

import styled from "styled-components";
import { MenuAction } from "../../store";

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

  const menu = useSelector(s => s.menu);
  const dispatch = useDispatch();

  return (
  <StyledMenu
    open={open}
  >
    <Grid
      direction="column wrap"
    >
      {
        menu.genders.length > 0 &&
        menu.genders.map(gender => {
          return (
          <Grid
            key={gender.gender_id}
            direction="column wrap"
          >
            <h2
              onClick={() => {
                if(!selected.gender_ids.has(gender.gender_id)){
                  dispatch(MenuAction.findCategoriesByGenderId(gender.gender_id))
                }
                toggleSelected('gender_ids', gender.gender_id);
              }}
            >{selected.gender_ids.has(gender.gender_id) ? '^' : 'v'} {capitalizeFirstLetter(gender.name)}</h2>
            
            {selected.gender_ids.has(gender.gender_id) && (
              <Grid
                direction="column wrap"
              >
                <h4>
                  <a
                    href={`/shop/${gender.name}`}
                  >All</a>
                </h4>
                
                {gender.categories && gender.categories.length > 0 && gender.categories.map(cat => {
                  return (
                  <Grid
                    key={cat.category_id}
                    direction="column wrap"
                  >
                    <h4
                      onClick={() => {
                        if(!selected.category_ids.has(cat.category_id)){
                          dispatch(MenuAction.findSubCategoriesByCategoryId(cat.category_id))
                        }
                        toggleSelected('category_ids', cat.category_id);
                      }}
                    >{selected.category_ids.has(cat.category_id) ? '^' : 'v'} {capitalizeFirstLetter(cat.name)}</h4>

                    {selected.category_ids.has(cat.category_id) && (
                      <Grid
                        direction="column wrap"
                      >
                        <p>
                          <a
                            href={`/shop/${gender.name}/categories/${cat.category_id}`}
                          >All</a>
                        </p>
                        {cat.sub_categories && cat.sub_categories.length > 0 && cat.sub_categories.map(sub_cat => {
                          return (
                            <p
                              key={sub_cat.sub_category_id}
                            ><a
                              href={`/shop/${gender.name}/categories/${cat.category_id}/sub_categories/${sub_cat.sub_category_id}`}
                            >{sub_cat.text}</a></p>
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