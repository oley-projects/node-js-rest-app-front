import Modal from "./Modal";

const ErrorHandler = (props) => (
  <>
    {props.error && (
      <Modal
        title='An Error Occurred'
        onAccept={props.onHandle}
        onCancel={props.onHandle}
      >
        <p>{props.error.message}</p>
      </Modal>
    )}
  </>
);

export default ErrorHandler;