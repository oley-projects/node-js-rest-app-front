import { Link } from "react-router-dom";

const ButtonEl = (props) => {
  if (props.isFormValid === false && props.isFormValid !== undefined) {
    return (
      <button
        disabled
        className={props.marginLeft ? 'margin-left' : ''}
      >
        {props.name}
      </button>
    ) 
  }
  
  return (
    <Link to={props.linkTo} className={props.marginLeft ? 'margin-left' : ''}><button>
      {props.name}
    </button></Link>
  )
};

export default ButtonEl;