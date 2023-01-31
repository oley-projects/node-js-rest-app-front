import ButtonEl from "./ButtonEl";
// import styled from "styled-components";

const Modal = (props) => {

  return (
    <>
      <h1>{props.title}</h1>
      <hr />
      <div>{props.children}</div>
      <div className="right">
        <span onClick={() => props.acceptEditPostHandler()}><ButtonEl name={'Apply'} /></span>
        <span onClick={() => props.inputCancelHandler()}><ButtonEl name={'Cancel'} /></span>
      </div>
    </>
  )
};

export default Modal;