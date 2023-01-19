import { useState, useEffect } from 'react';

import Post from '../../components/Feed/Post';
import Button from '../../components/Button';
import FeedEdit from '../../components/Feed/FeedEdit';
import Input from '../../components/Form/Input';
import Paginator from '../../components/Paginator';
import Loader from '../../components/Loader';
import ErrorHandler from '../../components/ErrorHandler';
import styled from 'styled-components';

const Feed = () => {
  const [state, setState] = useState({
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  });

  useEffect(() => {
    fetch('URL')
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Failed to fetch user status.');
      }
      return res.json();
    })
    .then(resData => {
      setState({ status: resData.status });
    })
    .catch(catchError);

  loadPosts();
  // eslint-disable-next-line
  }, []);

  const loadPosts = (direction) => {
    if (direction) {
      setState({ postsLoading: true, posts: [] });
    }
    let page = state.postPage;
    if (direction === 'next') {
      page++;
      setState({ postPage: page });
    }
    if (direction === 'previous') {
      page--;
      setState({ postPage: page });
    }
    fetch('http://localhost:8080/feed/posts')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch posts.');
        }
        return res.json();
      })
      .then(resData => {
        setState({
          posts: resData.posts,
          totalPosts: resData.totalItems,
          postsLoading: false
        });
      })
      .catch(catchError);
  };

  const statusUpdateHandler = (event) => {
    event.preventDefault();
    fetch('URL')
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Can't update status!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(catchError);
  };

  const newPostHandler = () => {
    setState({ isEditing: true });
  };

  const startEditPostHandler = postId => {
    setState(prevState => {
      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  const cancelEditHandler = () => {
    setState({ isEditing: false, editPost: null });
  };

  const finishEditHandler = (postData) => {
    setState({
      editLoading: true
    });
    // Set up data (with image!)
    let url = 'URL';
    if (state.editPost) {
      url = 'URL';
    }

    fetch(url)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then(resData => {
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt
        };
        setState(prevState => {
          let updatedPosts = [...prevState.posts];
          if (prevState.editPost) {
            const postIndex = prevState.posts.findIndex(
              p => p._id === prevState.editPost._id
            );
            updatedPosts[postIndex] = post;
          } else if (prevState.posts.length < 2) {
            updatedPosts = prevState.posts.concat(post);
          }
          return {
            posts: updatedPosts,
            isEditing: false,
            editPost: null,
            editLoading: false
          };
        });
      })
      .catch(err => {
        console.log(err);
        setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err
        });
      });
  };

  const statusInputChangeHandler = (input, value) => {
    setState({ status: value });
  };

  const deletePostHandler = postId => {
    setState({ postsLoading: true });
    fetch('URL')
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Deleting a post failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        setState(prevState => {
          const updatedPosts = prevState.posts.filter(p => p._id !== postId);
          return { posts: updatedPosts, postsLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        setState({ postsLoading: false });
      });
  };

  const errorHandler = () => {
    setState({ error: null });
  };

  const catchError = (error) => {
    setState({ error: error });
  };

  return (
    <>
      <ErrorHandler error={state.error} onHandle={errorHandler} />
      <FeedEdit
        editing={state.isEditing}
        selectedPost={state.editPost}
        loading={state.editLoading}
        onCancelEdit={cancelEditHandler}
        onFinishEdit={finishEditHandler}
      />
      <FeedStatus>
        <form onSubmit={statusUpdateHandler}>
          <Input
            type="text"
            placeholder="Your status"
            control="input"
            onChange={statusInputChangeHandler}
            value={state.status}
          />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </form>
      </FeedStatus>
      <FormControl>
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </FormControl>
      <section className="feed">
        {state.postsLoading && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Loader />
          </div>
        )}
        {state.posts?.length <= 0 && !state.postsLoading ? (
          <p style={{ textAlign: 'center' }}>No posts found.</p>
        ) : null}
        {!state.postsLoading && (
          <Paginator
            onPrevious={() => loadPosts('previous')}
            onNext={() => loadPosts('next')}
            lastPage={Math.ceil(state.totalPosts / 2)}
            currentPage={state.postPage}
          >
            {state.posts?.map(post => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString('en-US')}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={() => startEditPostHandler(post._id)}
                onDelete={() => deletePostHandler(post._id)}
              />
            ))}
          </Paginator>
        )}
      </section>
    </>
  );
}


const FeedStatus = styled.section`
  width: 90%;
  margin: 1rem auto;
  form {
    display: flex;
    align-items: center;
  }
  form * {
    margin: 0 0.5rem;
  }
  .new-post__preview-image {
    width: 15rem;
    height: 7rem;
  }
  @media (min-width: 768px) {
    width: 30rem;
  }
`;
const FormControl = styled.section`
  text-align: center;
`;


export default Feed;
