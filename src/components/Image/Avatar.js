import Image from './Image';
import styled from "styled-components";

const Avatar = (props) => (
  <WrapAvatar
    style={{ width: props.size + 'rem', height: props.size + 'rem' }}
  >
    <Image imageUrl={props.image} />
  </WrapAvatar>
);

const WrapAvatar = styled.div`
  width: 10rem;
  height: 10rem;
  margin: 0.5rem auto;
  border-radius: 50%;
  overflow: hidden;
`;

export default Avatar;