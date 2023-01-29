import styled from "styled-components";

const Input = (props) => {
  return (
    <Wrapper>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {props.element === 'input' && (
        <input
          type={props.type}
          id={props.id}
          required={props.required}
          placeholder={props.placeholder}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, e.target.files)} maxLength='40'
        />
      )}
      {props.element === 'textarea' && (
        <textarea
          id={props.id}
          required={props.required}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, e.target.files)}
          maxLength='300'
        />
      )}
      {props.element === 'file' && (
        <input type='file'
          id={props.id}
          onChange={e => props.inputChangeHandler(props.id, e.target.value, e.target.files)}
        />
      )}
    </Wrapper>
  )
};

const Wrapper = styled.div`
  label {
    text-transform: capitalize;
    margin-bottom: 0.4rem;
    display: block;
  }
  margin-bottom: 1rem;
`;

export default Input;