import styled from "styled-components";

const Paginator = (props) => (
  <WrapPaginator>
    {props.children}
    <div className="paginator__controls">
      {props.currentPage > 1 && (
        <button className="paginator__control" onClick={props.onPrevious}>
          Previous
        </button>
      )}
      {props.currentPage < props.lastPage && (
        <button className="paginator__control" onClick={props.onNext}>
          Next
        </button>
      )}
    </div>
  </WrapPaginator>
);

const WrapPaginator = styled.div`
  .paginator{
    &__controls {
      display: flex;
      justify-content: center;
    }

    &__control {
      width: 5rem;
      padding: 0.25rem 0;
      margin: 0 1rem;
      border: 1px solid #3b0062;
      background: transparent;
      font: inherit;
      cursor: pointer;
      font-size: 1rem;
      color: #3b0062;
    }

    &__control:hover,
    &__control:active {
      color: #fab83f;
      border-color: #fab83f;
    }

    &__control:focus {
      outline: none;
    } 
  }
`;

export default Paginator;