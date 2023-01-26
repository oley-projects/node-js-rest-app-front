import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper className='center'>
      <span />
    </Wrapper>
  )
};

const Wrapper = styled.div`
  span {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    display: inline-block;
    border-top: 4px solid #999;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
`;

export default Loading;