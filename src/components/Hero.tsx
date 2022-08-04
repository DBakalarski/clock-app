import bgImgMobileDay from '../assets/mobile/bg-image-daytime.jpg';
import bgImgMobileNight from '../assets/mobile/bg-image-nighttime.jpg';
import bgImgTabletDay from '../assets/tablet/bg-image-daytime.jpg';
import bgImgTabletNight from '../assets/tablet/bg-image-nighttime.jpg';
import bgImgDesktopDay from '../assets/desktop/bg-image-daytime.jpg';
import bgImgDesktopNight from '../assets/desktop/bg-image-nighttime.jpg';
import { useContext } from 'react';
import { ThemeContext, EContextTheme } from '../store/ThemeProvider';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  opacity: 0.4;
  background-color: #000;
`;

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
      <Image
        src={smallImg}
        srcSet={`${smallImg} 300w, ${mediumimg} 768w, ${largeImg} 1280w`}
        alt=''
      />
      <Background />
    </>
  );
};

export default Hero;
