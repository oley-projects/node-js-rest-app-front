import Button from '../Button';
import styled from 'styled-components';

const Post = (props) => (
  <WrapPost>
    <header className="post__header">
      <h3 className="post__meta">
        Posted by {props.author} on {props.date}
      </h3>
      <h1 className="post__title">{props.title}</h1>
    </header>
    {/* <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="post__content">{props.content}</div> */}
    <div className="post__actions">
      <Button mode="flat" link={props.id}>
        View
      </Button>
      <Button mode="flat" onClick={props.onStartEdit}>
        Edit
      </Button>
      <Button mode="flat" design="danger" onClick={props.onDelete}>
        Delete
      </Button>
    </div>
  </WrapPost>
);

const WrapPost = styled.article`
  margin: 1rem 0;
  border: 1px solid #3b0062;
  border-radius: 5px;
  padding: 0.5rem;

  @media (min-width: 768px) {
    padding: 1rem;
    width: 40rem;
    margin-left: auto;
    margin-right: auto;
  }

  .post {
    &__meta {
      font-size: 1rem;
      color: #707070;
      margin: 0;
    }

    &__title {
      font-size: 1.5rem;
      margin: 1rem 0;
      color: #3b0062;
    }

    &__image {
      height: 15rem;
      width: 100%;
    }

    &__actions {
      text-align: right;
    }
  }
`;

export default Post;