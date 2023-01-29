import ButtonEl from "./ButtonEl";
// import styled from "styled-components";

const Modal = (props) => {

  const clickHandler = () => {
    props.acceptEditPostHandler();
  };

  return (
    <>
      <h1>{props.title}</h1>
      <hr />
      <div>{props.children}</div>
      <div className="right">
        <span onClick={clickHandler}><ButtonEl name={'Apply'} /></span>
      </div>
    </>
  )
};

export default Modal;