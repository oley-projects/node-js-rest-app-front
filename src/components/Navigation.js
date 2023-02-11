import styled from "styled-components";
import { Link } from "react-router-dom";

const navItems = [
  { id: 'feed', text: 'Feed', link: '/', auth: true },
  { id: 'login', text: 'Login', link: '/login', auth: false },
  { id: 'signup', text: 'Signup', link: '/signup', auth: false }
];

const Navigation = (props) => {
  return (
    <Wrapper>
      <NavContent>
        <ul>
          <li>
            <StyledLink to='/'>Home</StyledLink>
          </li>
        </ul>
        <ul>
          {[...navItems.filter(item => item.auth === props.isAuth).map(item => (
            <li key={item.id}><StyledLink to={item.link}>{item.text}</StyledLink></li>
          ))]}
          {props.isAuth && (
            <li>
              <StyledLink to='#' onClick={props.onLogout}>Logout</StyledLink>
            </li>
          )}
        </ul>
      </NavContent>
    </Wrapper>
  )
};

const Wrapper = styled.header`
  padding: 0 2rem;
  height: 5rem;
  background-color: #b9bacf;
  @media (min-width: 960px) {
    padding: 0 5rem;
  }
`;
const NavContent = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  li {
    display: inline-block;
    height: 5rem;
    &:not(:first-of-type) {
      margin-left: 1rem;
    }
  }
`;
const StyledLink = styled(Link)`
  margin: 1rem 0;
  padding: 0 1.5rem;
  height: 3rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

export default Navigation;