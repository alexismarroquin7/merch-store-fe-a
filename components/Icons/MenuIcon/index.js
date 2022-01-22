import { useToggle } from "../../../hooks";
import styled from "styled-components";

const StyledMenuIcon = styled.div`
  display: inline-block;
  
  div {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    gap: .4rem;
  
    span {
      width: 2rem;
      height: .2rem;
      background-color: ${({open}) => open ? 'red' : 'black' };
      transition: all .2s;
    }
    
    span:nth-child(1){
      transform: ${({open}) => open ? 'rotate(-45deg) translate(0rem, .3rem)' : 'rotate(0deg)' };
      width: ${({open}) => open ? '50%' : '100%' };
    }
    
    span:nth-child(2){
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0deg)' }
      
    }
    span:nth-child(3){
      transform: ${({open}) => open ? 'rotate(-45deg) translate(-.2rem, -.5rem)' : 'rotate(0deg)' };
      width: ${({open}) => open ? '50%' : '100%' };
    }
  }


`

export const MenuIcon = ({open}) => {
  const {toggled: menuOpen, flipToggle: toggleMenuOpen} = useToggle(open);
  return (
  <StyledMenuIcon
    open={menuOpen}
    onClick={() => {
      toggleMenuOpen();
    }}
  >
    <div>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </StyledMenuIcon>
  )
}