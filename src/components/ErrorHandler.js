import Backdrop from "./Backdrop";
import Modal from "./Modal"

const ErrorHandler = (props) => {
  <>
    {props.error && (
      <>
        <Backdrop onClick={props.onHandle} />
        <Modal
          title="An Error Occurred"
          onCancelModal={props.onHandle}
          onAcceptModal={props.onHandle}
          acceptEnabled
        >
          <p>{props.error.message}</p>
        </Modal>
      </>
    )}
  </>
}

export default ErrorHandler;