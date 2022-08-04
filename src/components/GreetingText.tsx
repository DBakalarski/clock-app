import React from 'react';
import iconSun from '../assets/desktop/icon-sun.svg';
import iconMoon from '../assets/desktop/icon-moon.svg';
import styled from 'styled-components';

const GreetingContainer = styled.div`
  font-size: 15px;
  letter-spacing: 3px;
  display: flex;
  align-items: center;

  img {
    padding-right: 8px;
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const GreetingText: React.FC<{ hours: number }> = (props) => {
  const { hours } = props;

  const displayText = () => {
    if (hours > 5 && hours < 12) {
      return 'Good morning';
    }
    if (hours >= 12 && hours < 18) {
      return 'Good afternoon';
    }
    if (hours >= 18 || hours <= 5) {
      return 'Good night';
    }

    return '';
  };

  const iconSrc = hours >= 18 || hours < 5 ? iconMoon : iconSun;

  return (
    <GreetingContainer>
      {Boolean(hours) && (
        <>
          <img src={iconSrc} alt='sun' />
          {displayText()}
        </>
      )}
    </GreetingContainer>
  );
};

export default GreetingText;
