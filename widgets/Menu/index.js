import { Grid, MenuIcon } from "../../components"

export const Menu = ({open}) => {
  return (
  <Grid
    border="1px solid red"
  >
    
    <MenuIcon
      open={open}
    />

  </Grid>
  )
}