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
    postsLoading: true,
    editLoading: false
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
        }, 1000);
      } catch (error) {
        setState({...state, postsLoading: false});
        console.log(error);
      }
    };
    loadPosts();
  // eslint-disable-next-line
  },[]);

  const newPostHandler = () => {
    setState({...state, isEditing: true});
  };

  const closeModal = () => {
    setState({...state, isEditing: false});
  };

  const finishEditHandler = async (postData) => {
    setState({...state, editLoading: true});
    let url = 'http://localhost:8080/feed/post';
    let method= 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content
        })
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      const data = await res.json();
      const newPostData = data.post;
      setState({...state, isEditing: false, posts: [...state.posts, newPostData]});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className={state.isEditing ? 'overflow-hidden' : ''}>
      <div className='center'>
        <input className='status-input' />
        <button className="status-btn">Update status</button>
      </div>
      <div className='center'>
        <button style={{margin: '2rem 0'}} onClick={newPostHandler}>New post</button>
      </div>
      <section className='center'>
        {state.postsLoading && <Loading />}
        {state.isEditing && (
          <FeedEdit
            finishEditHandler={finishEditHandler}
            loading={state.editLoading}
            closeModal={closeModal}
          />
        )}
        <div>
        {!state.postsLoading && state.posts.length && state.posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            author={post.creator.name}
            date={new Date(post.createdAt).toLocaleDateString()}
          />
        ))}
        </div>
      </section>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  button {
    padding: 1rem 1.5rem;
    color: #999;
    transition: all 0.2s;
    border: 0.1rem solid rgb(239, 239, 239);
    &:hover, &:active {
      color: #eee;
      border-color: #aaa2a1;
    }
  }
  .status-input {
    width: auto;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  .status-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default Feed;