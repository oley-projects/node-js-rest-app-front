import styled from "styled-components";

const Input = (props) => (
  <WrapInput>
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    {props.control === 'input' && (
      <input
        className={[
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched'
        ].join(' ')}
        type={props.type}
        id={props.id}
        required={props.required}
        value={props.value || ''}
        placeholder={props.placeholder}
        onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
        onBlur={props.onBlur}
      />
    )}
    {props.control === 'textarea' && (
      <textarea
        className={[
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched'
        ].join(' ')}
        id={props.id}
        rows={props.rows}
        required={props.required}
        value={props.value}
        onChange={e => props.onChange(props.id, e.target.value)}
        onBlur={props.onBlur}
      />
    )}
  </WrapInput>
);

const WrapInput = styled.div`
  margin: 1rem 0;
  width: 100%;

  label {
    display: block;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  input,
  textarea {
    display: block;
    font: inherit;
    padding: 0.25rem 0.5rem;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  .touched.invalid {
      border-color: red;
      background: #ffc2c2;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #3b0062;
    color: #3b0062;
  }
`;

export default Input;