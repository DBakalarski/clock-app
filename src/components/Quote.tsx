import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Nullable } from '../helpers/types';
import classes from './Quote.module.css';
import iconRefresh from '../assets/desktop/icon-refresh.svg';

export interface IQuoteState {
  text: string;
  author: string;
}

const Quote = () => {
  const [quote, setQuote] = useState<Nullable<IQuoteState>>(null);

  const getQuote = async () => {
    const res = await axios.get(
      'https://programming-quotes-api.herokuapp.com/Quotes/random'
    );
    setQuote({
      text: res.data.en,
      author: res.data.author,
    });
    console.log(res.data);
  };

  useEffect(() => {
    getQuote();
    console.log('quote');
  }, []);
  return (
    <div className={classes.quote}>
      <button onClick={getQuote} className={classes.refresh}>
        <img src={iconRefresh} alt='refresh' />
      </button>

      <div className={classes.text}>{quote?.text}</div>
      <div className={classes.author}>{quote?.author}</div>
    </div>
  );
};

export default Quote;
