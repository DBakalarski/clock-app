import React, { useState, useCallback } from 'react';
import Quote from './components/Quote';
import TimeContainer from './components/TimeContainer';
import classes from './App.module.css';
import ThemeProvider from './store/ThemeProvider';
import Hero from './components/Hero';

function App() {
  const [isAddDataVisible, setIsAddDataVisible] = useState<boolean>(false);

  const handleAdditionalData = useCallback(() => {
    setIsAddDataVisible((prev) => !prev);
  }, []);

  return (
    <ThemeProvider>
      <div className={classes.app}>
        <Hero />
        <div className={classes.container}>
          <Quote isQuoteVisible={!isAddDataVisible} />
          <TimeContainer
            handleAdditionalData={handleAdditionalData}
            isAddDataVisible={isAddDataVisible}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
