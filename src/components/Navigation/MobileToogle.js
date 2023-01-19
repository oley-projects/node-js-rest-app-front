import styled from "styled-components";

const MobileToggle = (props) => (
  <StyledToggle onClick={props.onOpen}>
    <ToggleBar />
    <ToggleBar />
    <ToggleBar />
  </StyledToggle>
);

const StyledToggle = styled.button`
  background: transparent;
  border: none;
  display: flex;
  width: 2.5rem;
  height: 80%;
  flex-direction: column;
  justify-content: space-evenly;
  cursor: pointer;
  padding: 0;
  margin-right: 1rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const ToggleBar = styled.span`
  width: 2.5rem;
  height: 4px;
  background: white;
`;

export default MobileToggle;