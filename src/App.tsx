import React from 'react';
import Quote from './components/Quote';
import TimeContainer from './components/TimeContainer';
import classes from './App.module.css';
import ThemeProvider from './store/ThemeProvider';
import Hero from './components/Hero';

function App() {
  return (
    <ThemeProvider>
      <div className={classes.app}>
        <Hero />
        <div className={classes.container}>
          <Quote />
          <TimeContainer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
