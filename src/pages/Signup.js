import { useState, useEffect } from "react";

import Input from "../components/Input";
import ButtonEl from "../components/ButtonEl";

import styled from "styled-components";
import { required, length, email } from "../utils/validators";

const Signup = (props) => {
  const [state, setState] = useState({
    signupForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email, length({ max: 35 })]
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5, max: 35 })]
      },
      name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ max: 35 })]
      },
      formIsValid: false
    }
  });

  useEffect(() => {
    setState(prevState => {
      return {...prevState, formIsValid: false}
    })
  }, []);

  const inputChangeHandler = (input, value) => {
    setState(prevState => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
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
        signupForm: updatedForm,
        formIsValid
      }
    });
  };

  const inputBlurHandler = input => {
    setState(prevState => {
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input], 
          touched: true
        }
      }
      return {...state, signupForm: updatedForm}
    })
  }

  return (
    <Wrapper>
      <header>
        <h2>Sign Up</h2>
      </header>
      <form>
        <Input
          element='input'
          id='email'
          required={true}
          placeholder={'Enter your Email'}
          inputChangeHandler={inputChangeHandler}
          inputBlurHandler={inputBlurHandler}
          valid={state.signupForm.email.valid}
          touched={state.signupForm.email.touched}
          value={state.signupForm.email.value || ''}
        />
        <Input
          element='input'
          id='name'
          required={true}
          placeholder={'Enter your Name'}
          inputChangeHandler={inputChangeHandler}
          inputBlurHandler={inputBlurHandler}
          valid={state.signupForm.name.valid}
          touched={state.signupForm.name.touched}
          value={state.signupForm.name.value || ''}
        />
        <Input
          element='input'
          id='password'
          required={true}
          placeholder={'Type a password'}
          inputChangeHandler={inputChangeHandler}
          inputBlurHandler={inputBlurHandler}
          valid={state.signupForm.password.valid}
          touched={state.signupForm.password.touched}
          value={state.signupForm.password.value || ''}
        />
        <div className="center">
          <ButtonEl
            linkTo='#'
            name='signup'
            clickHandler={props.onSignup}
            state={state}
            isFormValid={state.formIsValid}
          />
        </div>
      </form>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin: 7rem auto 0;
  padding: 1.5rem;
  max-width: 30rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  header {
    margin-bottom: 3rem;
    text-align: center;
  }
  button {
    color: #999;
    border: 0.1rem solid rgb(239, 239, 239);
    transition: all ease 0.2s;
    &:hover, &:active {
      color: #eee;
      border-color: #aaa2a1;
    }
  }
`;

export default Signup;