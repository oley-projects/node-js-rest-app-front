import styled from "styled-components";

const Toolbar = (props) => (
  <WrapToolbar>
     {props.children}
  </WrapToolbar>
);

const WrapToolbar = styled.div`
  width: 100%;
  height: 3.5rem;
  background: #3b0062;
`;

export default Toolbar;