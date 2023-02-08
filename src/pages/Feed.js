import { useState, useEffect } from 'react';

import Loading from '../components/Loading';
import Post from '../components/Post'
import FeedEdit from '../components/FeedEdit';

import styled from 'styled-components';

const Feed = () => {
  const [state, setState] = useState({
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    error: '',
    postPage: 1,
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
        const postData = data.posts.map(post => {
          return {
            ...post,
            imagePath: post.imageUrl
          };
        });
        setState({...state, postsLoading: false, ...state.posts, posts: postData});
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

  const cancelEditHandler = () => {
    setState({...state, isEditing: false, editPost: null});
  };

  const startEditHandler = (postId) => {
    setState((prevState) => {
      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };
      return {
        ...prevState,
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  const finishEditHandler = async (postData) => {
    setState({...state, editLoading: true});
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('image', postData.image);
    let url = 'http://localhost:8080/feed/post';
    let method= 'POST';
    if (state.editPost) {
      url = 'http://localhost:8080/feed/post/' + state.editPost._id;
      method = 'PUT';
    }
    try {
      const res = await fetch(url, {
        method,
        body: formData
      });
      if (res.status !== 200 && res.status !== 201) {
        const text = await res.text();
        const { message } = JSON.parse(text);
        throw new Error(message);
      }
      const { post } = await res.json();

      setState( (prevState) => { 
        let updatedPosts = [...prevState.posts];
        if (prevState.editPost) {
          const postIndex = prevState.posts.findIndex(
            (p) => p._id === prevState.editPost._id
          );
          updatedPosts[postIndex] = post;
        } else if (prevState.posts.length <= 1) {
          updatedPosts = prevState.posts.concat(post);
        } else {
          updatedPosts = [...updatedPosts, post];
        }
        return {
          ...prevState,
          isEditing: false,
          editPost: null,
          editLoading: false,
          posts: updatedPosts
        }
      });
    } catch (error) {
      setState({
        ...state,
        isEditing: false,
        editPost: null,
        editLoading: false,
        error: error.message
      });
    }
  };

  const deletePostHandler = async (postId) => {
    setState({...state, postsLoading: true});
    try {
      const res = await fetch('http://localhost:8080/feed/post/' + postId, {
        method: 'DELETE'
      });
      if (res.status !== 200 && res.status !==201 ) {
        throw new Error('Deleting a post failed!');
      }
      setState((prevState) => {
        const updatedPosts = prevState.posts.filter(p => p._id !== postId);
        return {
          ...state,
          posts: updatedPosts,
          postsLoading: false
        }
      });
    } catch (error) {
        setState({...state, postsLoading: false});
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
            isEditing={state.isEditing}
            selectedPost={state.editPost}
            loading={state.editLoading}
            finishEditHandler={finishEditHandler}
            cancelEditHandler={cancelEditHandler}
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
            startEditHandler={startEditHandler}
            deletePostHandler={deletePostHandler}
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