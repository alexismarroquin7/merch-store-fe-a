import styled from "styled-components"

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`

export const Section = (props) => {
  return (
  <StyledSection>
    {props.children}
  </StyledSection>
  )
}