import classes from './Hero.module.css';
import bgImgMobileDay from '../assets/mobile/bg-image-daytime.jpg';
import bgImgMobileNight from '../assets/mobile/bg-image-nighttime.jpg';
import { useContext } from 'react';
import { ThemeContext, EContextTheme } from '../store/ThemeProvider';

const Hero = () => {
  const ctx = useContext(ThemeContext);

  const srcImage =
    ctx.theme === EContextTheme.Light ? bgImgMobileDay : bgImgMobileNight;
  return <img src={srcImage} alt='' className={classes.img} />;
};

export default Hero;
