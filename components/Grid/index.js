import styled from "styled-components";

const StyledGrid = styled.div`
  display: flex;
  flex-flow: ${props => props.direction ? props.direction : 'row wrap'};
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
  align-items: ${props => props.align ? props.align : 'flex-start'};
  gap: ${props => props.gap ? props.gap : 'none'};
`

export const Grid = (props) => (
  <StyledGrid
    direction={props.direction ? props.direction : ''}
    align={props.align ? props.align : ''}
    justify={props.justify ? props.justify : ''}
    gap={props.gap ? props.gap : ''}
  >{props.children}</StyledGrid>
);