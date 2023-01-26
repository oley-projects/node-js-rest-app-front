import styled from "styled-components";
import ButtonEl from "./ButtonEl";

const Post = (props) => {
  return (
    <Wrapper>
      <header>
        <h3>Posted by {props.author} at {props.date}</h3>
        <h1>{props.title}</h1>
      </header>
      <div>
        <ButtonEl name={'View'} />
        <ButtonEl marginLeft={true} name={'Edit'} />
        <ButtonEl marginLeft={true} name={'Delete'} />
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  padding: 1.5rem 3rem;
  display: inline-block;
  border: 0.1rem solid rgb(239, 239, 239);
  box-shadow: 0 0 0.5rem rgb(239, 239, 239);
  border-radius: 0.5rem;
  h1 {
    margin-top: 1rem;
    text-align: start;
  }
  header {
    margin-bottom: 2rem;
  }
`;

export default Post;