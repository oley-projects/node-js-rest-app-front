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
    userStatus: '',
    statusInputValue: '',
    totalPosts: 0,
    editPost: null,
    error: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  });
  useEffect(() => {

    loadPosts();
  // eslint-disable-next-line
  }, []);
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
      const resStatus = await fetch('http://localhost:8080/auth/status', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + props.token
          }
        });
        if (resStatus.status !== 200) {
          throw new Error('Failed to fetch user status.');
        }
        const dataStatus = await resStatus.json();
      setState({
        ...state,
        posts: postData,
        totalPosts: data.totalItems,
        postsLoading: false,
        postPage: page,
        userStatus: dataStatus.status
      });
    } catch (error) {
      setState({...state, postsLoading: false});
      console.log(error);
    }
  };
console.log(state.error);
  const statusUpdateHandler = async () => {
    if (state.statusInputValue === state.userStatus) {
      setState({...state, statusInputValue: '', error: 'Your status had not changed'})
      throw new Error('You type your previous status, please use different one!');
    }
    if (!state.statusInputValue) {
      setState({...state, error: 'Not valid status'});
      throw new Error('Invalid status!');
    }
    setState({...state, editLoading: true});
    try {
      const res = await fetch('http://localhost:8080/auth/status', {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userStatus: state.statusInputValue })
      });
      if (res.status !== 200) {
        throw new Error('Failed to update user status!');
      }
      setState(prevState => ({
        ...prevState,
        editLoading: false,
        userStatus: prevState.statusInputValue,
        statusInputValue: ''
      }));
    } catch (error) {
      console.log(error);
      setState({...state, editLoading: false});
    }
  }

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

  const statusInputChangeHandler = (value) => {
    setState({ ...state, statusInputValue: value })
  }

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
      if (!state.postsLoading) {
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
      }
    } catch (error) {
        setState({...state, postsLoading: false});
        console.log(error);
    }
  };

  return (
    <Wrapper className={state.isEditing ? 'overflow-hidden' : ''}>
      <form onSubmit={e => e.preventDefault()} className='center status-bar'>
        <input
          className='status-input'
          type='text'
          id='status'
          required
          placeholder={state.userStatus}
          onChange={(e) => statusInputChangeHandler(e.target.value)}
          value={state.statusInputValue || ''}
          maxLength='40'
        />
        <button className="status-btn" onClick={statusUpdateHandler}>Update status</button>
      </form>
      <div>
        <p>My status: <span>{state.status || ''}</span></p>
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