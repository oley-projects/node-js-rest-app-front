import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import Loading from "../components/Loading";

const SinglePost = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    title: '',
    author: '',
    date: '',
    image: '',
    content: '',
    isLoading: true
  });
  
  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetch(`http://localhost:8080/feed/post/${id}`);
        if (res.status !== 200) {
          throw new Error('Failed to fetch post!');
        }
        const data = await res.json();
        const { title, creator: {name: author}, updatedAt: date, imageUrl: imagePath, content } = data.post;
        const image = `http://localhost:8080/${imagePath}`
        setState({ ...state, title, author, date, image, content, isLoading: false })
      } catch (error) {
        console.log(error);
        setState({ ...state, isLoading: false})
      }
    };
    loadPost();
  // eslint-disable-next-line
  }, []);
  if (state.isLoading) {
    return (
      <Loading />
    );
  }
  
  return (
    <Wrapper>
      <h1>{state.title}</h1>
      <h3>Created by {state.author}</h3>
      <Image>
        <img src={state.image} alt={state.title} />
      </Image>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  text-align: center;
`;

const Image = styled.div`
  margin-top: 3rem;
  // max-width: 20rem;
`;

export default SinglePost;