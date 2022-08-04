import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { ThemeContext } from '../store/ThemeProvider';
import GreetingText from './GreetingText';
import { Nullable } from '../helpers/types';
import arrowUp from '../assets/desktop/icon-arrow-up.svg';
import arrowDown from '../assets/desktop/icon-arrow-down.svg';
import AdditionalInfo from './AdditionalInfo';
import Loader from './Loader';
import styled from 'styled-components';

const TimeContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  padding: 0 26px 80px 26px;
  flex-grow: 1;
  justify-content: flex-end;
  @media (min-width: 768px) {
    padding: 0 64px;
  }
  @media (min-width: 1024px) {
    min-height: 288px;
    padding: 0 165px 100px 165px;
    position: relative;
  }
`;

const Time = styled.div`
  font-weight: 700;
  font-size: 100px;
  letter-spacing: -2.5px;
  height: 120px;
  @media (min-width: 768px) {
    font-size: 175px;
    letter-spacing: -4px;
    height: 175px;
  }
  @media (min-width: 1024px) {
    font-size: 200px;
    letter-spacing: -5px;
    height: 200px;
  }
`;

const Button = styled.div`
  margin-top: 48px;
  margin-bottom: 0;
  width: 115px;
  color: #000;
  padding: 3px 3px 3px 17px;
  background: #fff;
  border-radius: 28px;
  box-shadow: none;
  border: 0;
  outline: 0;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    opacity: 0.5;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 3.75px;
  }
  @media (min-width: 768px) {
    margin-top: 95px;
    margin-bottom: 77px;
    width: 146px;
    span {
      font-size: 16px;
      letter-spacing: 5px;
    }
  }
  @media (min-width: 1024px) {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateX(-100%);
  }
`;

const Arrow = styled.span`
  width: 32px;
  height: 32px;
  background: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Place = styled.span`
  @media (min-width: 768px) {
    font-size: 18px;
    padding-top: 15px;
  }
`;

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
      <TimeContainerStyled>
        <GreetingText hours={time?.hours!} />
        {isLoading && <Loader />}
        {!isLoading && Boolean(time) && (
          <>
            <Time>
              {time?.hours}:{formatMinutes}
            </Time>
            <Place>
              In {city}, {country}
            </Place>
          </>
        )}

        <Button onClick={props.handleAdditionalData}>
          <span>{textButton}</span>
          <Arrow>
            <img src={displayArrow} alt='' />
          </Arrow>
        </Button>
      </TimeContainerStyled>
      <AdditionalInfo isVisible={isAddDataVisible} data={additionalData} />
    </>
  );
};

export default TimeContainer;
