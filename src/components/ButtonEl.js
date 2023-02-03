const ButtonEl = (props) => {
  console.log(props.isFormValid);
  if (props.isFormValid === false && props.isFormValid !== undefined) {
    return (
      <button disabled className={props.marginLeft ? 'margin-left' : ''}>{props.name}</button>
    ) 
  }
  return (
    <button className={props.marginLeft ? 'margin-left' : ''}>{props.name}</button>
  )
};

export default ButtonEl;