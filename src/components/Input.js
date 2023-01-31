import styled from "styled-components";

const Input = (props) => {
  return (
    <Wrapper>
      {props.label && <label htmlFor={props.id}>{props.id}</label>}
      {props.element === 'input' && (
        <input
          type={props.type}
          id={props.id}
          required={props.required}
          placeholder={props.placeholder}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, e.target.files)} maxLength='40'
          onBlur={() => props.inputBlurHandler(props.id)}
        />
      )}
      {props.element === 'textarea' && (
        <textarea
          id={props.id}
          required={props.required}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, e.target.files)}
          maxLength='300'
          onBlur={() => props.inputBlurHandler(props.id)}
        />
      )}
      {props.element === 'file' && (
        <input type='file'
          id={props.id}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, e.target.files)}
          onBlur={() => props.inputBlurHandler(props.id)}
        />
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  margin-bottom: 1rem;
  
  label {
    text-transform: capitalize;
    margin-bottom: 0.4rem;
    display: block;
  }
`;

export default Input;