const Modal = (props) => {

  return (
    <>
      <h1>{props.title}</h1>
      <hr />
      <div>{props.children}</div>
    </>
  )
};

export default Modal;