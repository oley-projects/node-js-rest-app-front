import styled from "styled-components";

const FilePicker = (props) => (
  <WrapFilePicker>
    <label htmlFor={props.id}>{props.label}</label>
    <input
      className={[
        !props.valid ? 'invalid' : 'valid',
        props.touched ? 'touched' : 'untouched'
      ].join(' ')}
      type="file"
      id={props.id}
      onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
      onBlur={props.onBlur}
    />
  </WrapFilePicker>
);

const WrapFilePicker = styled.div`
  margin: 1rem 0;
  width: 100%;
  
  .touched.invalid {
    border-color: red;
    background: #ffc2c2;
  }
`;

export default FilePicker;