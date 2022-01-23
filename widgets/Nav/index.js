import { MenuIcon, SearchIcon, Grid, BagIcon } from "../../components"
import { Menu } from "../Menu";
import styled from "styled-components";
import { useToggle } from "../../hooks";

const StyledNav = styled.nav`
  position: sticky;
  top: 0rem;
  z-index: 1000;
  
  .nav__container {
    position: relative;
    width: 100%;
    z-index: 1000;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem;
    background-color: white;
  }
`;

export const Nav = ({ menuOpen }) => {
  const { toggled: open, flipToggle: toggleOpen } = useToggle(menuOpen);
  return (
  <StyledNav
    open={open}
  >

    <div
      className="nav__container"
    >
      <Grid
        direction="row wrap"
        align="center"
        gap="1rem"
      >
        <BagIcon/>

        <SearchIcon/>

        <MenuIcon
          open={menuOpen}
          onClick={() => {
            toggleOpen();
          }}
        />
      </Grid>

    </div>

    <Menu 
      open={open}
    />

  </StyledNav>
  )
}