import { useState, useRef, useEffect } from "react";

import Modal from "./Modal";
import Input from "./Input";
import ButtonEl from "./ButtonEl";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { generateBase64FromImage } from '../utils/image'
import { required, length } from '../utils/validators'
import styled from "styled-components";

const FeedEdit = (props) => {
  const POST_FORM = {
    title: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })]
    },
    image: {
      value: '',
      valid: false,
      touched: false,
      validators: [required]
    },
    content: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })]
    }
  };

  const [state, setState] = useState({
    postForm: POST_FORM,
    isFormValid: false,
    imagePreview: null
  });
  const ref = useRef(null);
  useOnClickOutside(ref, props.cancelEditHandler);
  useEffect(() => {
    if (props.isEditing && props.selectedPost) {
      setState((prevState) => {
        const postForm = {
          title: {
            ...prevState.postForm.title,
            value: props.selectedPost.title,
            valid: true
          },
          image: {
            ...prevState.postForm.image,
            value: props.selectedPost.imagePath,
            valid: true
          },
          content: {
            ...prevState.postForm.content,
            value: props.selectedPost.content,
            valid: true
          }
        }
        return ({...state, postForm, isFormValid: true})
      });
    }
  // eslint-disable-next-line
  }, []);
  const inputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          setState((prevState) => (
            {
              ...prevState,
              imagePreview: b64,
              postForm: {
                ...prevState.postForm,
                image: {
                  ...prevState.postForm.image,
                  value: files[0]
                }
              }
            }
            ));
        })
        .catch(() => {
          setState((prevState) => ({
            ...prevState,
            imagePreview: null,
            postForm: {
              ...prevState.postForm,
              image: {
                ...prevState.postForm.image,
                value: '',
                valid: false
              }
            }
          }));
        });
    }
    setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.postForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.postForm,
        [input] : {
          ...prevState.postForm[input],
          valid: isValid,
          value: files ? '' : value
        }
      };
      let isFormValid = true;
      for (const inputName in updatedForm) {
        isFormValid = isFormValid && updatedForm[inputName].valid;
      }
      return {
        ...prevState,
        postForm: updatedForm,
        isFormValid
      }
    });
  };

  const inputCancelHandler = () => {
    setState({
      postForm: POST_FORM,
      isFormValid: false,
      imagePreview: null
    });
    props.cancelEditHandler();
  };

  const acceptEditPostHandler = () => {
    const post = {
      title: state.postForm.title.value,
      image: state.postForm.image.value,
      content: state.postForm.content.value
    }
    props.finishEditHandler(post);
  };

  const inputBlurHandler = (input) => {
    setState((prevState) => {
      const updatedForm = {
        ...prevState.postForm,
        [input]: {
          ...prevState.postForm[input], 
          touched: true
        }
      }
      return {...state, postForm: updatedForm}
    });
  }

  return (
    <>
      <Wrapper />
      <ModalWrap ref={ref}>
        <Modal title={'New Post'}>
          <form>
            <Input
              element='input'
              id='title'
              required={true}
              inputChangeHandler={inputChangeHandler}
              inputBlurHandler={inputBlurHandler}
              valid={state.postForm.title.valid}
              touched={state.postForm.title.touched}
              value={state.postForm.title.value || ''}
            />
            <Input
              element='file'
              id='image'
              inputChangeHandler={inputChangeHandler}
              inputBlurHandler={inputBlurHandler}
              valid={state.postForm.image.valid}
              touched={state.postForm.image.touched}
              value={state.postForm.image.value || ''}
            />
            <Image>
              {!state?.imagePreview && (<p>Please choose an image.</p>)}
              {state?.imagePreview && (
                <img src={state?.imagePreview} alt='state.title.value' />
              )}
            </Image>
            <Input
              element='textarea'
              id='content'
              required={true}
              inputChangeHandler={inputChangeHandler}
              inputBlurHandler={inputBlurHandler}
              valid={state.postForm.content.valid}
              touched={state.postForm.content.touched}
              value={state.postForm.content.value || ''}
            />
            <div className="right">
              <ButtonEl name={'Apply'} isFormValid={state.isFormValid} clickHandler={acceptEditPostHandler} />
              <ButtonEl name={'Cancel'} clickHandler={inputCancelHandler} />
            </div>
          </form>
        </Modal>
      </ModalWrap>
    </>
  )
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;
const ModalWrap = styled.div`
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  background: #eee;
  position: fixed;
  top: 50% ;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.div`
  margin: -0.9rem 0 1.5rem 0;
  p {
    font-size: 0.8em;
    color: #999;
  }
  img {
    width: 3rem;
    border-radius: 0.3rem;
  }
`;

export default FeedEdit;