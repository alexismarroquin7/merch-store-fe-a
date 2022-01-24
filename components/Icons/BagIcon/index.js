import styled from "styled-components"

const StyledBagIcon = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  .bag_icon__handle {
    border: .2rem solid black;
    width: .2rem;
    padding: .1rem .2rem;
    transform: translate(0rem, .2rem);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .bag_icon__bag {
    border: .2rem solid black;
    padding: .5rem;
    border-radius: 5px;
  }
`

export const BagIcon = ({onClick}) => {
  return (
  <StyledBagIcon
    onClick={onClick ? onClick : () => {}}
  >
    <div
      className="bag_icon__handle"
    ></div>
    <div
      className="bag_icon__bag"
    ></div>
  </StyledBagIcon>
  )
}