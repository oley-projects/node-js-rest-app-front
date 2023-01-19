import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = (props) => (
  <WrapButton>
    {!props.link ? (
      <button
        className={['button', `button--${props.design}`, `button--${props.mode}`].join(' ')}
        onClick={props.onClick}
        disabled={props.disabled || props.loading}
        type={props.type}
      >
        {props.loading ? 'Loading...' : props.children}
      </button>
    ) : (
      <Link
        className={[ 'button', `button--${props.design}`, `button--${props.mode}`].join(' ')}
        to={props.link}
      >
        {props.children}
      </Link>
    )}
  </WrapButton>
);

const WrapButton = styled.div`
  display: inline-block;
  .button {
    font: inherit;
    border: 1px solid #3b0062;
    color: #3b0062;
    background: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
  }

  .button:focus {
    outline: none;
  }

  .button:disabled {
    background: #ccc;
    color: #888888;
    cursor: not-allowed;
    border: #ccc;
    box-shadow: none;
  }

  .button:disabled:hover,
  .button:disabled:active {
    background: #ccc;
    color: #888888;
    border: #ccc;
  }

  .button:hover,
  .button:active {
    background: #3b0062;
    color: white;
  }

  .button--flat {
    border: none;
  }

  .button--flat:hover,
  .button--flat:active {
    background: rgba(59, 0, 98, 0.3);
    color: #3b0062;
  }

  .button--raised {
    background: #3b0062;
    color: white;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.26);
  }

  .button--raised:hover,
  .button--raised:active {
    background: #520288;
  }

  .button.button--accent {
    border-color: #fab83f;
    color: #fab83f;
  }

  .button--accent:hover,
  .button--accent:active {
    background: #fab83f;
    color: #3b0062;
  }

  .button--flat.button--accent:hover,
  .button--flat.button--accent:active {
    background: rgba(250, 184, 63, 0.3);
    color: #fab83f;
  }

  .button.button--accent.button--raised {
    background: #fab83f;
    color: #3b0062;
  }

  .button--raised.button--accent:hover,
  .button--raised.button--accent:active {
    background: #fbc766;
  }

  .button.button--danger {
    border-color: #a30000;
    color: #a30000;
  }

  .button--danger:hover,
  .button--danger:active {
    background: #a30000;
    color: white;
  }

  .button--flat.button--danger:hover,
  .button--flat.button--danger:active {
    background: rgba(163, 0, 0, 0.3);
    color: #a30000;
  }

  .button.button--danger.button--raised {
    background: #a30000;
    color: white;
  }

  .button--raised.button--danger:hover,
  .button--raised.button--danger:active {
    background: #c00000;
  }

  .button.button--success {
    border-color: #00b359;
    color: #00b359;
  }

  .button--success:hover,
  .button--success:active {
    background: #00b359;
    color: white;
  }

  .button--flat.button--success:hover,
  .button--flat.button--success:active {
    background: rgba(0, 179, 90, 0.3);
    color: #00b359;
  }

  .button.button--success.button--raised {
    background: #00b359;
    color: white;
  }

  .button--raised.button--success:hover,
  .button--raised.button--success:active {
    background: #00a151;
  }
`;

export default Button;