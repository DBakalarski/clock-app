import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Nullable } from '../helpers/types';
import iconRefresh from '../assets/desktop/icon-refresh.svg';
import Loader from './Loader';
import styled from 'styled-components';

const RefreshButton = styled.button`
  position: absolute;
  right: 27px;
  top: 32px;
  background: none;
  box-shadow: none;
  border: none;
  @media (min-width: 768px) {
    right: 98px;
    top: 80px;
  }
  @media (min-width: 1024px) {
    top: 68px;
  }
`;

const QuoteContainer = styled.div`
  padding: 32px 60px 0 26px;
  position: relative;
  @media (min-width: 768px) {
    padding: 80px 131px 0 64px;
  }
  @media (min-width: 1024px) {
    padding: 56px 131px 0 165px;
    max-width: 580px;
  }
`;

const QuoteText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`;

const QuoteAuthor = styled.div`
  font-weight: 700;
  font-size: 12px;
  margin-top: 10px;
  @media (min-width: 768px) {
    font-size: 18px;
    margin-top: 14px;
  }
`;

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
        <QuoteContainer>
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              <RefreshButton onClick={getQuote}>
                <img src={iconRefresh} alt='refresh' />
              </RefreshButton>
              <QuoteText>{quote?.text}</QuoteText>
              <QuoteAuthor>{quote?.author}</QuoteAuthor>
            </>
          )}
        </QuoteContainer>
      )}
    </>
  );
};

export default Quote;
