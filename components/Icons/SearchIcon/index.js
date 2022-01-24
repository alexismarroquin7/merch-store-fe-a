import styled from "styled-components"

const StyledSearchIcon = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0rem .5rem .2rem .25rem;
  
  .search_icon__circle {
    border: .2rem solid black;
    border-radius: 100%;
    padding: .4rem;
  }

  .search_icon__stem {
    border: .1rem solid black;
    background-color: black;
    width: .75rem;
    transform-origin: top right;
    transform: rotate(45deg) translate(.8rem, -.3rem);
  }
`

export const SearchIcon = ({onClick}) => {
  return (
  <StyledSearchIcon
    onClick={onClick ? onClick : () => {}}
  >
    <div
      className="search_icon__circle"
      ></div>
    <div
      className="search_icon__stem"
    ></div>
  </StyledSearchIcon>
  )
}