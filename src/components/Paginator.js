
const Paginator = (props) => {
  return (
    <div className="center">
      {props.currentPage > 1 && (
        <button onClick={() => props.pageHandler('prev')}>Prev</button>
      )}
      {props.currentPage < props.lastPage && (
        <button onClick={() => props.pageHandler('next')} className={props.currentPage < props.lastPage ? 'margin-left' : ''}>Next</button>
      )}
    </div>
  )
};

export default Paginator