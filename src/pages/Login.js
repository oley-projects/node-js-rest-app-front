import { useState } from "react";

import Input from "../components/Input";
import ButtonEl from "../components/ButtonEl";

import styled from "styled-components";
import { required, length, email } from "../utils/validators";

const Login = (props) => {
  const [state, setState] = useState({
    loginForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email]
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })]
      },
      formIsValid: false
    }
  });

  const inputChangeHandler = (input, value) => {
    setState(prevState => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value
        }
      }
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        ...state,
        loginForm: updatedForm,
        formIsValid
      }
    });
  };

  const inputBlurHandler = input => {
    setState(prevState => {
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input], 
          touched: true
        }
      }
      return {...state, loginForm: updatedForm}
    })
  }

  return (
    <Wrapper>
      <header>
        <h2>Log In</h2>
      </header>
      <form onSubmit={e => props.onLogin(e, {
        email: state.loginForm.email.value, password: state.loginForm.password.value
      })}>
        <Input
          element='input'
          id='email'
          required={true}
          inputChangeHandler={inputChangeHandler}
          inputBlurHandler={inputBlurHandler}
          valid={state.loginForm.email.valid}
          touched={state.loginForm.email.touched}
          value={state.loginForm.email.value || ''}
        />
        <Input
          element='input'
          id='password'
          required={true}
          inputChangeHandler={inputChangeHandler}
          inputBlurHandler={inputBlurHandler}
          valid={state.loginForm.password.valid}
          touched={state.loginForm.password.touched}
          value={state.loginForm.password.value || ''}
        />
        <ButtonEl linkTo='#' name='login' />
      </form>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 7rem auto 0;
  padding: 1.5rem;
  max-width: 30rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  header {
    margin-bottom: 3rem;
    text-align: center;
  }
`;

export default Login;