import { Link } from "react-router-dom";
import styled from "styled-components";

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false }
];

const NavigationItems = (props) => [
  ...navItems.filter(item => item.auth === props.isAuth).map(item => (
    <NavItem
      key={item.id}
      className={props.mobile ? 'mobile' : ''}
    >
      <Link to={item.link} onClick={props.onChoose}>
        {item.text}
      </Link>
    </NavItem>
  )),
  props.isAuth && (
    <NavItem key="logout">
      <button onClick={props.onLogout}>Logout</button>
    </NavItem>
  )
];

const NavItem = styled.li`
  padding: 0 1.5rem;
  a {
    text-decoration: none;
    color: white;
  }
  &.mobile {
    font-size: 1.75rem;
    margin: 0.5rem 0;
  }
  &.mobile a {
    color: #3b0062;
  }
  a:hover,
  a:active,
  a.active {
    color: #fab83f;
  }
  &:last-of-type {
    padding-right: 0;
  }
  button {
    font: inherit;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
  }
  button:hover,
  button:active {
    color: #fab83f;
  }
`;

export default NavigationItems;