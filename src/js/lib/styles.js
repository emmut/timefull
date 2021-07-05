import { css } from 'styled-components';

export const StyledShadow = css`
  --shadow-distance: 1px 1px;
  --shadow-blur: 1px;
  box-shadow: var(--shadow-distance) var(--shadow-blur) rgba(0, 0, 0, 0.2);

  &:focus,
  &:hover {
    transition: box-shadow 200ms ease-in-out;
    --shadow-distance: 2px 2px;
    --shadow-blur: 2px;
  }
`;
