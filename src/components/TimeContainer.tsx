import React, { useContext, useEffect, useState, useCallback } from 'react';
import classes from './TimeContainer.module.css';
import axios from 'axios';
import { ThemeContext } from '../store/ThemeProvider';
import GreetingText from './GreetingText';
import { Nullable } from '../helpers/types';
import arrowUp from '../assets/desktop/icon-arrow-up.svg';
import arrowDown from '../assets/desktop/icon-arrow-down.svg';
import AdditionalInfo from './AdditionalInfo';
import Loader from './Loader';

export interface ITimeState {
  hours: number;
  minutes: number;
}

export interface IAdditionalData {
  timezone: string;
  dayOfYear: string;
  dayOfWeek: number;
  weekNumber: number;
}

const TimeContainer: React.FC<{
  isAddDataVisible: boolean;
  handleAdditionalData: () => void;
}> = (props) => {
  const [time, setTime] = useState<Nullable<ITimeState>>(null);
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [additionalData, setAdditionalData] =
    useState<Nullable<IAdditionalData>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isAddDataVisible } = props;

  const ctxTheme = useContext(ThemeContext);

  const getTime = useCallback(async () => {
    try {
      setIsLoading(true);
      const resIp = await axios.get('https://geolocation-db.com/json/');
      const resTime = await axios.get(
        `https://worldtimeapi.org/api/ip/${resIp.data.IPv4}`
      );
      const hours = new Date(resTime.data.datetime).getHours();
      const minutes = new Date(resTime.data.datetime).getMinutes();

      setTime({ hours, minutes: minutes });
      setCountry(resIp.data.country_code);
      setCity(resIp.data.city);

      if (hours > 18 || hours < 5) {
        ctxTheme.setThemeDark();
      }

      setAdditionalData({
        timezone: resTime.data.timezone,
        dayOfYear: resTime.data.day_of_year,
        dayOfWeek: resTime.data.day_of_week,
        weekNumber: resTime.data.week_number,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const formatMinutes =
    time?.minutes! < 10 ? `0${time?.minutes}` : time?.minutes;

  const textButton = isAddDataVisible ? 'less' : 'more';

  const displayArrow = isAddDataVisible ? arrowDown : arrowUp;

  useEffect(() => {
    getTime();
  }, [getTime]);

  return (
    <>
      <div className={classes.timeContainer}>
        <GreetingText hours={time?.hours!} />
        {isLoading && <Loader />}
        {!isLoading && Boolean(time) && (
          <>
            <div className={classes.time}>
              {time?.hours}:{formatMinutes}
            </div>
            <div className={classes.place}>
              In {city}, {country}
            </div>
          </>
        )}

        <button onClick={props.handleAdditionalData} className={classes.button}>
          <span>{textButton}</span>
          <span className={classes.arrow}>
            <img src={displayArrow} alt='' />
          </span>
        </button>
      </div>
      <AdditionalInfo isVisible={isAddDataVisible} data={additionalData} />
    </>
  );
};

export default TimeContainer;
