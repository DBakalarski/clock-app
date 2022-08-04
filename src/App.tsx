import React, { useState, useCallback } from 'react';
import Quote from './components/Quote';
import TimeContainer from './components/TimeContainer';
import ThemeProvider from './store/ThemeProvider';
import Hero from './components/Hero';
import './App.css';

function App() {
  const [isAddDataVisible, setIsAddDataVisible] = useState<boolean>(false);

  const handleAdditionalData = useCallback(() => {
    setIsAddDataVisible((prev) => !prev);
  }, []);

  return (
    <ThemeProvider>
      <div className='app'>
        <Hero />
        <div className='container'>
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
