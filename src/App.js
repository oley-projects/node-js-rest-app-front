import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Backdrop from './components/Backdrop';
import Toolbar from './components/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation';
import ErrorHandler from './components/ErrorHandler';
import FeedPage from './pages/Feed/Feed';
import SinglePostPage from './pages/Feed/SinglePost';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';

import GlobalStyle from './components/GlobalStyle';

const App = () => {
  const [state, setState] = useState({
    showBackdrop: false,
    showMobileNav: false,
    isAuth: true,
    token: null,
    userId: null,
    authLoading: false,
    error: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setState({ isAuth: true, token: token, userId: userId });
    setAutoLogout(remainingMilliseconds);
    // eslint-disable-next-line
  }, []);

  const  mobileNavHandler = (isOpen) => {
    setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  const backdropClickHandler = () => {
    setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  const logoutHandler = () => {
    setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  const loginHandler = (event, authData) => {
    event.preventDefault();
    setState({ authLoading: true });
    fetch('URL')
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
      })
      .catch(err => {
        console.log(err);
        setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  const signupHandler = (event, authData) => {
    event.preventDefault();
    setState({ authLoading: true });
    fetch('URL')
      .then(res => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Creating a user failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        setState({ isAuth: false, authLoading: false });
        // props.history.replace('/');?TODO
      })
      .catch(err => {
        console.log(err);
        setState({
          isAuth: false,
          authLoading: false,
          error: err
        });
      });
  };

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const errorHandler = () => {
    setState({ error: null });
  };

  let routes = (
    <Routes>
      <Route
        path="/"
        element={
          <LoginPage
            onLogin={loginHandler}
            loading={state.authLoading}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignupPage
            onSignup={signupHandler}
            loading={state.authLoading}
          />
        }
      />
      {/* <Navigate to="/" /> */}
    </Routes>
  );
  if (state.isAuth) {
    routes = (
      <Routes>
        <Route
          path="/"
          element={
            <FeedPage userId={state.userId} token={state.token} />
          }
        />
        <Route
          path="/:postId"
          element={
            <SinglePostPage userId={state.userId} token={state.token} />
          }
        />
        {/* <Navigate to="/" /> */}
      </Routes>
    );
  }

  return (
    <>
      <GlobalStyle />
      {state.showBackdrop && (
        <Backdrop onClick={backdropClickHandler} />
      )}
      <ErrorHandler error={state.error} onHandle={errorHandler} />
      <Layout
        header={
          <Toolbar>
            <MainNavigation
              onOpenMobileNav={() => mobileNavHandler(true)}
              onLogout={logoutHandler}
              isAuth={state.isAuth}
            />
          </Toolbar>
        }
        mobileNav={
          <MobileNavigation
            open={state.showMobileNav}
            mobile
            onChooseItem={() => mobileNavHandler(false)}
            onLogout={logoutHandler}
            isAuth={state.isAuth}
          />
        }
      />
      {routes}
    </>
  );

}

export default App;