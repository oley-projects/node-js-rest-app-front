import styled from "styled-components";

const Layout = (props) => (
  <>
    <StyledHeader>{props.header}</StyledHeader>
    {props.mobileNav}
    <StyledMain>{props.children}</StyledMain>
  </>
);

const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
`;
const StyledMain = styled.main`
  margin-top: 3.5rem;
  padding: 1rem;
  @media (min-width: 768px) {
    margin-top: 3.5rem;
    padding: 1rem 2rem;
  }
`;

export default Layout;