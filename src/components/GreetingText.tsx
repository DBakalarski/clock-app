import React from 'react';
import iconSun from '../assets/desktop/icon-sun.svg';
import iconMoon from '../assets/desktop/icon-moon.svg';
import classes from './GreetingText.module.css';

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
    <div className={classes.greeting}>
      {Boolean(hours) && (
        <>
          <img src={iconSrc} alt='sun' />
          {displayText()}
        </>
      )}
    </div>
  );
};

export default GreetingText;
