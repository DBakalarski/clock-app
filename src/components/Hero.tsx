import classes from './Hero.module.css';
import bgImgMobileDay from '../assets/mobile/bg-image-daytime.jpg';
import bgImgMobileNight from '../assets/mobile/bg-image-nighttime.jpg';
import bgImgTabletDay from '../assets/tablet/bg-image-daytime.jpg';
import bgImgTabletNight from '../assets/tablet/bg-image-nighttime.jpg';
import bgImgDesktopDay from '../assets/desktop/bg-image-daytime.jpg';
import bgImgDesktopNight from '../assets/desktop/bg-image-nighttime.jpg';
import { useContext } from 'react';
import { ThemeContext, EContextTheme } from '../store/ThemeProvider';

const Hero = () => {
  const ctx = useContext(ThemeContext);

  const smallImg =
    ctx.theme === EContextTheme.Light ? bgImgMobileDay : bgImgMobileNight;
  const mediumimg =
    ctx.theme === EContextTheme.Light ? bgImgTabletDay : bgImgTabletNight;
  const largeImg =
    ctx.theme === EContextTheme.Light ? bgImgDesktopDay : bgImgDesktopNight;

  return (
    <>
      <img
        className={classes.img}
        src={smallImg}
        srcSet={`${smallImg} 300w, ${mediumimg} 768w, ${largeImg} 1280w`}
        alt=''
      />
      <div className={classes.background}></div>
    </>
  );
};

export default Hero;
