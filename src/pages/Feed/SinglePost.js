import { useState, useEffect } from 'react';

import Image from '../../components/Image/Image';
import styled from 'styled-components';

const SinglePost = () => {
  const [state, setState] = useState({
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  });

  useEffect(() => {
    // const postId = props.match.params.postId;
    fetch('URL')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        setState({
          title: resData.post.title,
          author: resData.post.creator.name,
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          content: resData.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <WrapSinglePost>
      <h1>{state.title}</h1>
      <h2>
        Created by {state.author} on {state.date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={state.image} />
      </div>
      <p>{state.content}</p>
    </WrapSinglePost>
  );
}

const WrapSinglePost = styled.section`
  width: 90%;
  margin: auto;
  text-align: center;
  color: #3b0062;
  h2 {
    font-size: 1rem;
    color: #464646;
    padding-bottom: 1rem;
    border-bottom: 2px solid #464646;
  }
  &__image {
    height: 20rem;
    width: 20rem;
    margin: 1rem auto;
  }
  @media (min-width: 768px) {
    width: 40rem;
  }
`;

export default SinglePost;
