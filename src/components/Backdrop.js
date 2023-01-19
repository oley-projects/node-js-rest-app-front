import styled from "styled-components";

const Backdrop = (props) => (
  <WrapBackdrop
    className={props.open ? 'open' : ''}
    onClick={props.onClick}
  >
  </WrapBackdrop>
);

const WrapBackdrop = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  transition: opacity 0.3s ease-out;
  opacity: 1;
`;

export default Backdrop;