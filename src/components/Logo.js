import styled from "styled-components";

const Logo = () => (
  <WrapLogo>MessageNode</WrapLogo>
);

const WrapLogo = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid white;
  padding: 0.5rem;
  color: white;
`;

export default Logo;