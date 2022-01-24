import styled from "styled-components"

const StyledContainer = styled.div`
  width: 90%;
  display: flex;
  flex-flow: column wrap;
  background-color: ${props => props.theme.light.color.secondary.value};
  color: ${props => props.theme.light.color.primary.value};
  padding: 1rem;
  border-radius: 10px;
`

export const Container = (props) => {
  return (
  <StyledContainer>
    {props.children}
  </StyledContainer>
  )
}