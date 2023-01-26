import styled from "styled-components";

const ButtonEl = (props) => {
  return (
    <Wrapper className={props.marginLeft ? 'margin-left' : ''}>{props.name}</Wrapper>
  )
};

const Wrapper = styled.button`

`;

export default ButtonEl;