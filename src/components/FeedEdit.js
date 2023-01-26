import { useState, useRef } from "react";

import Modal from "./Modal";
import Input from "./Input";
import ButtonEl from './ButtonEl';
import useOnClickOutside from "../hooks/useOnClickOutside";
import { generateBase64FromImage } from '../utils/image'
import { required, length } from '../utils/validators'
import styled from "styled-components";

const FeedEdit = (props) => {
  const [state, setState] = useState({
    postForm: {
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
    },
    imagePreview: null
  });
  console.log(state);
  const ref = useRef();
  useOnClickOutside(ref, props.closeModal);

  const inputChangeHandler = (input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then(b64 => {
          setState({...state, imagePreview: b64 });
        })
        .catch(() => {
          setState({...state, imagePreview: null });
        });
    }
    setState({...state, ...state.postForm, [input]: {...state.postForm[input], value: files ? files[0] : value} });
  };

  /*const inputBlurHandler = (input) => {
    setState(...state, state.postForm);
  }*/

  return (
    <>
      <Wrapper />
      <ModalWrap ref={ref}>
        <Modal>
          <h2>NewPost</h2>
          <hr />
          <form>
            <Input element='input' label='title' id='title' required={true} inputChangeHandler={inputChangeHandler} />
            <Input element='file' label='Image' id='image' inputChangeHandler={inputChangeHandler} />
            <Input element='textarea' label='content' id='content' required={true} inputChangeHandler={inputChangeHandler} />
            <div className="right">
              <ButtonEl name={'Apply'} />
            </div>
          </form>
        </Modal>
      </ModalWrap>
    </>
  )
};

const Wrapper = styled.div`
  position: absolute;
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

export default FeedEdit;