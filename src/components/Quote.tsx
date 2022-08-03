import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Nullable } from '../helpers/types';
import classes from './Quote.module.css';
import iconRefresh from '../assets/desktop/icon-refresh.svg';
import Loader from './Loader';

export interface IQuoteState {
  text: string;
  author: string;
}

const Quote: React.FC<{ isQuoteVisible: boolean }> = (props) => {
  const [quote, setQuote] = useState<Nullable<IQuoteState>>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getQuote = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        'https://programming-quotes-api.herokuapp.com/Quotes/random'
      );
      setQuote({
        text: res.data.en,
        author: res.data.author,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);
  return (
    <>
      {props.isQuoteVisible && (
        <div className={classes.quote}>
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              <button onClick={getQuote} className={classes.refresh}>
                <img src={iconRefresh} alt='refresh' />
              </button>
              <div className={classes.text}>{quote?.text}</div>
              <div className={classes.author}>{quote?.author}</div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Quote;
