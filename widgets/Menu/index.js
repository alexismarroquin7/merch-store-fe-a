import { useState } from "react"
// import { Grid, Section } from "../../components"
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const StyledMenu = styled.section`
  width: 50%;
  height: 100vh;
  
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

const routes = [
  {
    gender_id: uuidv4(),
    name: 'Mens',
    options: [
      {
        option_id: uuidv4(),
        name: 'All',
        href: '/shop/mens',
      },
      {
        option_id: uuidv4(),
        name: 'Tops',
        options: [
          {
            name: 'All',
            href: '/shop/mens/tops'
          },
          {
            name: 'Short Sleeve',
            href: '/shop/mens/top/shirts/short-sleeve-shirts'
          },
        ]
      },
      {
        option_id: uuidv4(),
        name: 'Bottoms',
        href: '/shop/mens/bottoms'
      },
      {
        option_id: uuidv4(),
        name: 'Accessories',
        href: '/shop/mens/accessories'
      },
    ]
  },
  {
    gender_id: uuidv4(),
    name: 'Womens',
    options: [
      {
        option_id: uuidv4(),
        name: 'All',
        href: '/womens',
      },
      {
        option_id: uuidv4(),
        name: 'Tops',
        options: [
          {
            name: 'All',
            href: '/mens/tops'
          },
          {
            name: 'Short Sleeve',
            href: '/mens/top/shirts/short-sleeve-shirts'
          },
        ]
      },
      {
        option_id: uuidv4(),
        name: 'Bottoms',
        options: [
          {
            name: 'All',
            href: '/mens/bottoms'
          }
        ],
      },
      {
        option_id: uuidv4(),
        name: 'Accessories',
        href: '/mens/accessories'
      },
    ]
  }
]

export const Menu = ({ open }) => {
  
  const [listOpen, setListOpen] = useState({
    gender_id: '',
    category_id: '',
    sub_category_id: ''
  });

  const toggleListOpen = (key, id) => {
    if(listOpen[key] === id){
      setListOpen({...listOpen, [key]: ''});
    } else {
      setListOpen({...listOpen, [key]: id});
    }
  }

  return (
  <StyledMenu
    open={open}
  >
    <div
      className="menu__container"
    >
      {routes.map(gender => {
        return (
        <div
          key={gender.name}
        >
          <h3
            onClick={() => {
              toggleListOpen('gender_id', gender.gender_id);
            }}  
          >{listOpen.gender_id === gender.gender_id ? '^' : 'v'} {gender.name}</h3>
          
          {listOpen.gender_id === gender.gender_id && gender.options && gender.options.length > 0 && gender.options.map(parentCategory => {

            return (
            <div
              key={parentCategory.option_id}
            >
              {parentCategory.href ? (
                <h5
                  style={{
                    textDecoration: 'underline'
                  }}
                >
                  <a
                    href={parentCategory.href}
                  >
                    {parentCategory.name}
                  </a>
                </h5>
                ) : (  
                <h5
                  onClick={() => toggleListOpen('category_id', parentCategory.option_id)}
                >
                  {
                    parentCategory.options &&
                    parentCategory.options.length > 0 &&
                    listOpen.category_id === parentCategory.option_id ? '^' : 'v'
                  } {parentCategory.name}
                </h5>
                
            )}
              
              {parentCategory.options &&
              parentCategory.options.length > 0 &&
              listOpen.category_id === parentCategory.option_id &&
              parentCategory.options.map(childCategory => {
                return (
                <div
                  key={childCategory.href}
                >
                  <a
                    href={childCategory.href}
                  >{childCategory.name}</a>
                </div>
                )
              })}
            
            </div>
            )
          })}
        </div>
        )
      })}
    </div>
  </StyledMenu>
  )
}