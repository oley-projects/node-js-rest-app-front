import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SinglePost from "./pages/SinglePost";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import CheckingAuth from "./components/CheckingAuth";
import CheckingNotAuth from "./components/CheckingNotAuth";

import GlobalStyle from "./components/GlobalStyle";
import ErrorHandler from "./components/ErrorHandler";

const App = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    isAuth: false,
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
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    setState({...state, isAuth: true, token, userId});
    setAutoLogout(remainingMilliseconds)
    // eslint-disable-next-line
  }, []);

  const logoutHandler = () => {
    setState({...state, isAuth: false, token: null});
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  const loginHandler = async (e, authData) => {
    e.preventDefault();
    setState({...state, authLoading: true});
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password
        })
      });
      if (res.status === 422) {
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        throw new Error('Could not authenticate you!');
      }
      const {token, userId} = await res.json();
      setState({...state, isAuth: true, token, authLoading: false, userId});
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      );
      setAutoLogout(remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
    } catch (error) {
      setState({...state, isAuth: false, authLoading: false, error});
    }
  };

  const signupHandler = async (e, authData) => {
    e.preventDefault();
    setState({...state, authLoading: true});
    try {
      const res = await fetch('http://localhost:8080/auth/signup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: authData.signupForm.email.value,
          password: authData.signupForm.password.value,
          name: authData.signupForm.name.value
        })
      });
      if (res.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        throw new Error('Creating a user failed!');
      }
      const data = await res.json();
      console.log(data);
      navigate('/', { replace: true });
      setState({...state, isAuth: false, authLoading: false});
    } catch (error) {
      setState({...state, isAuth: false, authLoading: false, error});
    }
  }

  const setAutoLogout = milliseconds => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const errorHandler = () => {
    setState({...state, error: null})
  };

  return (
    <>
      <GlobalStyle />
      <ErrorHandler error={state.error} onHandle={errorHandler} />
      <Routes>
        <Route element={<Layout onLogout={logoutHandler} isAuth={state.isAuth} />}>
          <Route element={<CheckingAuth isAuth={state.isAuth} />}>
            <Route path="/" element={<Feed token={state.token} userId={state.userId} />} />
          </Route>
          <Route element={<CheckingNotAuth isAuth={state.isAuth} />}>
            <Route path="login" element={<Login onLogin={loginHandler} loading={state.authLoading} />} />
            <Route path="signup" element={<Signup onSignup={signupHandler} loading={state.authLoading} />} />
          </Route>
          <Route element={<CheckingAuth isAuth={state.isAuth} />}>
            <Route path="post/:id" element={<SinglePost token={state.token} userId={state.userId} />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
