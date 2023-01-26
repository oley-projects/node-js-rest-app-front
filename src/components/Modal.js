import styled from "styled-components";

const Modal = (props) => {
  return (
    <Wrapper>{props.children}</Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 0;
  width: 100%;
`;

export default Modal;