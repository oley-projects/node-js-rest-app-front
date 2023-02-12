import { useState } from "react";
import NavContent from "./NavContent";
import styled from "styled-components";

const Navigation = (props) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <Wrapper>
      <nav>
        <ul className="mobile">
          <li>
            <div className="hamburher" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </li>
        </ul>
        <NavContent isMobileOpen={isMobileOpen} isAuth={props.isAuth} onLogout={props.onLogout} />
      </nav>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  nav {
    padding: 0 2rem;
    background-color: #b9bacf;
    position: relative;
    @media (min-width: 960px) {
      padding: 0 5rem;
    }
  }
  .mobile {
    padding: 1rem 0;
    .hamburher {
      padding-left: 1rem;
      height: 3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 0.5rem;
      cursor: pointer;
      div {
        margin: 0.15rem 0;
        background: #eee;
        height: 0.18rem;
        width: 1.8rem;
      }
      &:hover, &:active {
        background: #aaa2a1;
      }
      @media (min-width: 640px) {
        display: none;
      }
    }
    @media (min-width: 640px) {
      padding: 0;
    }
  }
  .mobile-nav {
    @media (max-width: 640px) {
      position: absolute;
      top: 5rem;
      left: 0;
      right: 0;
      background-color: #b9bacf;
      padding: 0 1.5rem;
      display: block;
    }
  }
`;

export default Navigation;