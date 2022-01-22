import styled from "styled-components";

const StyledGrid = styled.div`
  display: flex;
  flex-flow: ${props => props.direction ? props.direction : 'row wrap'};
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
  align-items: ${props => props.align ? props.align : 'flex-start'};
  gap: ${props => props.gap ? props.gap : '0px'};
  border: ${props => props.border ? props.border : 'none'};
  width: ${props => props.width ? props.width : 'auto'};
  padding: ${props => props.padding ? props.padding : '0'};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : ''};
  color: ${props => props.color ? props.color : ''};
`

export const Grid = (props) => (
  <StyledGrid
    direction={props.direction ? props.direction : ''}
    align={props.align ? props.align : ''}
    justify={props.justify ? props.justify : ''}
    gap={props.gap ? props.gap : ''}
    border={props.border ? props.border : ''}
    width={props.width ? props.width : ''}
    padding={props.padding ? props.padding : ''}
    backgroundColor={props.backgroundColor ? props.backgroundColor : ''}
    color={props.color ? props.color : ''}
  >{props.children}</StyledGrid>
);