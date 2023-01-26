import { useState, useEffect } from 'react';

import Loading from '../components/Loading';
import Post from '../components/Post'
import FeedEdit from '../components/FeedEdit';

import styled from 'styled-components';

const Feed = () => {
  const [state, setState] = useState({
    isEditing: false,
    posts: [],
    editPost: null,
    postsLoading: true
  });
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('http://localhost:8080/feed/posts');
        
        if (res.status !== 200) {
          throw new Error('Failed to fetch post!');
        }
        const data = await res.json();
        const postData = data.posts;
        setTimeout(() => {
          setState({...state, postsLoading: false, ...state.posts, posts: postData});
        }, 1000)

      } catch (error) {
        setState({...state, postsLoading: false});
        console.log(error);
      }
    };
    loadPosts();
  // eslint-disable-next-line
  },[]);

  const newPostHandler = () => {
    setState({...state, isEditing: true})
  };
  const closeModal = () => {
    setState({...state, isEditing: false})
  }

  return (
    <Wrapper>
      <div>
        <div>
          <input />
          <button className="status-btn">Update status</button>
        </div>
        <div className='center'>
          <button style={{margin: '2rem 0'}} onClick={newPostHandler}>New post</button>
        </div>
        <section>
          {state.postsLoading && <Loading />}
          {state.isEditing && <FeedEdit closeModal={closeModal} />}
          {!state.postsLoading && state.posts.length && state.posts.map((post) => (
            <Post key={post._id} id={post._id} title={post.title} author={post.creator.name} date={new Date(post.createdAt).toLocaleDateString()} />
          ))}
        </section>
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    padding: 1.04rem 1.5rem;
    color: #999;
    transition: all 0.2s;
    border: 0.1rem solid rgb(239, 239, 239);
    &:hover, &:active {
      color: #eee;
      border-color: #aaa2a1;
    }
  }
  .status-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default Feed;