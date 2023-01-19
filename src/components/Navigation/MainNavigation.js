import { Link } from 'react-router-dom';

import MobileToggle from './MobileToogle';
import Logo from '../Logo';
import NavigationItems from './NavigationItems';

import styled from 'styled-components';

const MainNavigation = (props) => (
  <WrapMainNav>
    <MobileToggle onOpen={props.onOpenMobileNav} />
    <div className="main-nav__logo">
      <Link to="/">
        <Logo />
      </Link>
    </div>
    <div className="spacer" />
    <ul className="main-nav__items">
      <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
    </ul>
  </WrapMainNav>
);

const WrapMainNav = styled.nav`
  height: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  .spacer {
    flex: 1;
  }
  .main-nav {
    &__items {
      list-style: none;
      padding: 0;
      margin: 0 1.5rem;
      display: none;
      @media (min-width: 768px) {
        display: flex;
      }
    }

 
  }
`;

export default MainNavigation;