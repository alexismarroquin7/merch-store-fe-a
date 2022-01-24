// components
import { MenuIcon, SearchIcon, Grid, BagIcon } from "../../components"

// widgets
import { Menu } from "../Menu";

// hooks
import { useToggle } from "../../hooks";

// store
import { useDispatch, useSelector } from "react-redux";
import { MenuAction } from "../../store";
// style
import styled from "styled-components";
import { useEffect } from "react";

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

export const Nav = () => {
  const menu = useSelector(s => s.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!menu.open) return;
    dispatch(MenuAction.findAllGenders());
  }, [menu.open, dispatch]);

  return (
  <StyledNav
    open={menu.open}
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
          open={menu.open}
          onClick={() => {
            dispatch(MenuAction.toggleOpen());
          }}
        />
      </Grid>

    </div>

    <Menu 
      open={menu.open}
    />

  </StyledNav>
  )
}