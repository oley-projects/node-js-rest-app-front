import styled from "styled-components";

const Image = (props) => (
  <WrapImage
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? 'contain' : 'cover',
      backgroundPosition: props.left ? 'left' : 'center'
    }}
  />
);

const WrapImage = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
`;

export default Image;
