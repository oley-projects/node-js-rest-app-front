import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <h3>Page not found!</h3>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 10rem 0 0;
  text-align: center;
  width: 100%;
  h1 {
    margin-bottom: 3rem;
  }
`;

export default Error;