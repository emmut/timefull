import React from 'react';
import styled from 'styled-components';
import { SvgBase } from '../../lib/svg';
import { useSpring, animated } from 'react-spring';

const Svg = styled(SvgBase)`
  height: 100%;
  width: 100%;
`;

export function Morph({ color }) {
  const { x } = useSpring({
    loop: { reverse: true },
    reset: true,
    config: { duration: 5000 },
    from: {
      x: 0
    },
    to: {
      x: 2
    }
  });

  return (
    <Svg viewBox="0 0 600 600" style={{ color }}>
      <animated.path
        d={x.to({
          range: [0, 2],
          output: [
            'M 96 470 C 49.481 422.208 69 406.699 69 335 C 69 256.668 64.664 194.615 119 146 C 166.308 103.673 217.413 57 286 57 C 357.232 57 429.105 65.728 477 111 C 528.188 159.385 535 188.298 535 264 C 535 338.515 547.788 421.761 498 470 C 449.88 516.623 392.425 545 320 545 C 244.742 545 144.553 519.882 96 470 Z',
            'M 108.162 461 C 61.643 413.208 60 351.699 60 280 C 60 201.668 77.664 165.615 132 117 C 179.308 74.673 254.413 45 323 45 C 394.232 45 438.379 86.728 486.274 132 C 537.462 180.385 552 243.298 552 319 C 552 393.515 522.788 459.761 473 508 C 424.88 554.623 358.425 555 286 555 C 210.742 555 156.715 510.882 108.162 461 Z',
            'M 128.162 451 C 71.643 415.208 60 355.699 60 288 C 64 202.668 72.664 160.615 130 120 C 185.308 80.673 265.413 46 310 49 C 400.232 41 440.379 90.728 493.274 120 C 530.462 182.385 556 240.298 551 319 C 552 393.515 502.788 400.761 490 558 C 450.88 504.623 308.425 500 200 520 C 220.742 530 110.715 570.882 104.162 470 Z'
          ]
        })}
        fill="currentColor"
      />
    </Svg>
  );
}
