import styled from "styled-components";
import ButtonEl from "./ButtonEl";

const Post = (props) => {
  return (
    <Wrapper>
      <header>
        <h4>Posted by {props.author} at {props.date}</h4>
        <h2>{props.title}</h2>
      </header>
      <ButtonPanel>
        <ButtonEl name={'View'} linkTo={`/post/${props.id}`} />
        <ButtonEl marginLeft={true} name={'Edit'} linkTo='#' clickHandler={props.startEditHandler} state={props.id} />
        <ButtonEl marginLeft={true} name={'Delete'} linkTo='#' clickHandler={props.deletePostHandler} state={props.id} />
      </ButtonPanel>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  box-shadow: 0 0 0.5rem rgba(55, 55, 55, 0.15);
  background-color: rgba(255, 255, 222, 0.8);
  border-radius: 0.5rem;
  h1 {
    margin-top: 1rem;
    text-align: start;
  }
  header {
    margin-bottom: 2rem;
  }
  @media (min-width: 480px) {
    padding: 1.5rem 3rem;
  }
`;
const ButtonPanel = styled.div`
  @media (max-width: 460px) {
    display: flex;
    flex-wrap: wrap;
    a {
      margin: 0.2rem;
    }
  }
`;

export default Post;