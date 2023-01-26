import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper><p>© All Rights Reserved</p></Wrapper>
  )
};

const Wrapper = styled.footer`
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  //text-align: center;
  background-color: #b1b5cc;
  @media (min-width: 960px) {
    padding: 0 5rem;
  }
`;

export default Footer;