import NavigationItems from './NavigationItems';
import styled from 'styled-components';

const MobileNavigation = (props) => (
  <WrapNav className={props.open ? 'open' : ''}>
    <NavList className={props.mobile ? 'mobile' : ''}>
      <NavigationItems
        mobile
        onChoose={props.onChooseItem}
        isAuth={props.isAuth}
        onLogout={props.onLogout}
      />
    </NavList>
  </WrapNav>
);

const WrapNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 30rem;
  max-width: 90%;
  background: white;
  box-shadow: 1px 0 8px rbga(0, 0, 0, 0.26);
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
  z-index: 200;
  padding: 3rem 2rem;
  &.open {
    transform: translateX(0);
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  &.mobile {
    flex-direction: column;
  }
`;

export default MobileNavigation;