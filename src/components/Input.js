import styled from "styled-components";

const Input = (props) => {
  return (
    <Wrapper>
      {props.label && (
        <label htmlFor={props.id}>
          {props.id}
        </label>
        )}
      {props.element === 'input' && (
        <input
          id={props.id}
          type={props.type}
          name={props.id}
          className={(props.touched && !props.valid) ? 'invalid' : ''}
          required={props.required}
          placeholder={props.placeholder}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, '')} maxLength='40'
          onBlur={() => props.inputBlurHandler(props.id)}
          value={props.value}
        />
      )}
      {props.element === 'textarea' && (
        <textarea
          id={props.id}
          name={props.id}
          required={props.required}
          className={(props.touched && !props.valid) ? 'invalid' : ''}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, '')}
          maxLength='300'
          onBlur={() => props.inputBlurHandler(props.id)}
          value={props.value}
        />
      )}
      {props.element === 'file' && (
        <input
          id={props.id}
          type={props.element}
          name={props.id}
          className={(props.touched && !props.valid) ? 'invalid' : ''}
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