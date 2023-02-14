import { useState, useEffect } from 'react';

import Loading from '../components/Loading';
import Post from '../components/Post'
import FeedEdit from '../components/FeedEdit';
import Paginator from '../components/Paginator'

import styled from 'styled-components';

const Feed = (props) => {
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

  const loadPosts = async (direction) => {
    if (direction) {
      setState({ ...state, postsLoading: true, posts: [] });
    }
    let page = +state.postPage;
    if (direction === 'next') {
      page++;
    }
    if (direction === 'prev') {
      page--;
    }
    try {
      const res = await fetch('http://localhost:8080/feed/posts?page=' + page, {
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      });
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
      setState({
        ...state,
        posts: postData,
        totalPosts: data.totalItems,
        postsLoading: false,
        postPage: page
      });
    } catch (error) {
      setState({...state, postsLoading: false});
      console.log(error);
    }
  };

  useEffect(() => {
    loadPosts();
  // eslint-disable-next-line
  }, []);

  const newPostHandler = () => {
    setState({...state, isEditing: true});
  };

  const cancelEditHandler = () => {
    setState({...state, isEditing: false, editPost: null});
  };

  const startEditHandler = (_, postId) => {
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
        body: formData,
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      });
      if (res.status !== 200 && res.status !== 201) {
        const text = await res.text();
        const { message } = JSON.parse(text);
        throw new Error(message);
      }
      const { post } = await res.json();
      setState(prevState => { 
        let updatedPosts = [...prevState.posts];
        let currentPage = prevState.postPage;
        if (prevState.editPost) {
          const postIndex = prevState.posts.findIndex(
            (p) => p._id === prevState.editPost._id
          );
          updatedPosts[postIndex] = post;
        } else if (prevState.posts.length <= 1) {
          updatedPosts = prevState.posts.concat(post);
        } else if (prevState.posts.length >= 3) {
          updatedPosts = [post]
          currentPage = +prevState.postPage + 1
        } else {
          updatedPosts = [...updatedPosts, post];
        }
        return {
          ...prevState,
          isEditing: false,
          editPost: null,
          editLoading: false,
          posts: updatedPosts,
          postPage: currentPage
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

  const deletePostHandler = async (_, postId) => {
    setState({...state, postsLoading: true});
    try {
      const res = await fetch('http://localhost:8080/feed/post/' + postId, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      });
      if (res.status !== 200 && res.status !==201 ) {
        throw new Error('Deleting a post failed!');
      }
      
      setState((prevState) => {
        const updatedPosts = prevState.posts.filter(p => p._id !== postId);
        // return previous page for deleted last post on page
        if (+state.posts.length === 1 && +state.postPage > 1) {
          loadPosts('prev');
        } else {
          loadPosts();
        }
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
      <div className='center status-bar'>
        <input className='status-input' />
        <button className="status-btn">Update status</button>
      </div>
      <hr />
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
        {!state.postsLoading && state.posts.length === 0 && (
          <div>No posts found.</div>
        )}
        {!state.postsLoading && state.posts.length > 0 && state.posts.map((post) => (
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
        {!state.postsLoading && state.posts.length > 0 && (<Paginator
            pageHandler={loadPosts}
            lastPage={Math.ceil(state.totalPosts / 3)}
            currentPage={state.postPage}
          />
        )}
        </div>
      </section>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  button {
    color: #999;
    border: 0.1rem solid rgb(239, 239, 239);
    transition: all ease 0.2s;
    &:hover, &:active {
      color: #eee;
      border-color: #aaa2a1;
    }
  }
  hr {
    margin-top: 3rem;
    @media (min-width: 640px) {
      display: none;
    }
  }
  .status-bar {
    @media (max-width: 640px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .status-input {
    @media (min-width: 640px) {
      width: auto;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
  }
  .status-btn {
    @media (max-width: 640px) {
      margin-top: 1rem;
    }
    @media (min-width: 640px) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

export default Feed;