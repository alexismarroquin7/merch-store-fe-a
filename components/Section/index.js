import styled from "styled-components"

const StyledSection = styled.section`
  width: ${({width}) => width ? width : '100%'};
  height: ${({height}) => height ? height : 'auto'};
  border: ${({border}) => border ? border : 'none'};
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  padding: ${({padding}) => padding ? padding : '0 1rem'};
  
`

export const Section = (props) => {
  return (
  <StyledSection
    width={props.width ? props.width : null}
    height={props.height ? props.height : null}
    border={props.border ? props.border : null}
    padding={props.padding ? props.padding : null}
  >
    {props.children}
  </StyledSection>
  )
}