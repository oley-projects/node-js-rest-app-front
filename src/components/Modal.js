import Button from './Button';
import styled from 'styled-components';

const Modal = (props) => (
  <WrapModal>
    <header className="modal__header">
      <h1>{props.title}</h1>
    </header>
    <div className="modal__content">{props.children}</div>
    <div className="modal__actions">
      <Button design="danger" mode="flat" onClick={props.onCancelModal}>
        Cancel
      </Button>
      <Button
        mode="raised"
        onClick={props.onAcceptModal}
        disabled={!props.acceptEnabled}
        loading={props.isLoading}
      >
        Accept
      </Button>
    </div>
  </WrapModal>
);

const WrapModal = styled.div`
  position: fixed;
  width: 90%;
  left: 5%;
  top: 20vh;
  background: white;
  border-radius: 5px;
  z-index: 200;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  @media (min-width: 768px) {
    width: 40rem;
    left: calc((100% - 40rem) / 2);
  }
  .modal {
    &__header {
      border-bottom: 2px solid #3b0062;
    }

    &__header h1 {
      font-size: 1.5rem;
      color: #3b0062;
      margin: 1rem;
    }

    &__content {
      padding: 1rem;
    }

    &__actions {
      padding: 1rem;
      text-align: right;
    }

    &__actions button {
      margin: 0 0.5rem;
    }   
  }
`;

export default Modal;