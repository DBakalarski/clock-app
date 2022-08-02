import React, { useContext, useEffect, useState, useCallback } from 'react';
import classes from './TimeContainer.module.css';
import axios from 'axios';
import { ThemeContext } from '../store/ThemeProvider';
import GreetingText from './GreetingText';
import { Nullable } from '../helpers/types';
import arrowUp from '../assets/desktop/icon-arrow-up.svg';
import arrowDown from '../assets/desktop/icon-arrow-down.svg';

export interface ITimeState {
  hours: number;
  minutes: number;
}

const TimeContainer = () => {
  const [time, setTime] = useState<Nullable<ITimeState>>(null);
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const ctxTheme = useContext(ThemeContext);

  const getTime = useCallback(async () => {
    const resIp = await axios.get('https://geolocation-db.com/json/');
    const resTime = await axios.get(
      `http://worldtimeapi.org/api/ip/${resIp.data.IPv4}`
    );

    const hours = new Date(resTime.data.datetime).getHours();
    const minutes = new Date(resTime.data.datetime).getMinutes();

    setTime({ hours, minutes: minutes });
    setCountry(resIp.data.country_code);
    setCity(resIp.data.city);

    if (hours > 18 && hours < 6) {
      ctxTheme.setThemeDark();
    }

    console.log(resIp.data);
    console.log(resTime.data);
  }, [ctxTheme]);

  const formatMinutes =
    time?.minutes! < 10 ? `0${time?.minutes}` : time?.minutes;

  useEffect(() => {
    getTime();
  }, [getTime]);

  return (
    <div className={classes.timeContainer}>
      <GreetingText hours={time?.hours!} />
      <div className={classes.time}>
        {Boolean(time) && (
          <>
            {time?.hours}:{formatMinutes}
          </>
        )}
      </div>
      <div className={classes.place}>
        In {city}, {country}
      </div>
      <button className={classes.button}>
        <span>More</span>
        <span className={classes.arrow}>
          <img src={arrowDown} alt='' />
        </span>
      </button>
    </div>
  );
};

export default TimeContainer;
