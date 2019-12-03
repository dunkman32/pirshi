import React from 'react';
import { Random } from 'react-animated-text';
import randomColor from 'randomcolor';
import Header from '../components/header';
import Footer from '../components/footer';
import {
  BrowserView,
  MobileView,
} from 'react-device-detect';
import ParticlesBackground from '../components/particles-background';

const Naxui = () => {
  const color = randomColor();
  const colorFooter = randomColor({ luminosity: 'light' });
  return (
    <>
      <Header notfixed/>
      <BrowserView>
        <ParticlesBackground numbers={100}/>
        <div style={{ fontSize: 72, fontWeight: 'bolder', marginTop: '22%', color,  padding: 20}}>
          <Random
            text={'იძი ნახუი...'}
            paused={false}
            iterations={1}
            effect="verticalFadeIn"
            effectChange={2}
            effectDirection="up"
          />
        </div>
      </BrowserView>
      <MobileView>
        <ParticlesBackground numbers={45}/>
        <div style={{ fontSize: 40, fontWeight: 'bolder', marginTop: '60%', color, padding: 20 }}>
          <Random
            text={'იძი ნახუი...'}
            paused={false}
            iterations={1}
            effect="verticalFadeIn"
            effectChange={2}
            effectDirection="up"
          />
        </div>
      </MobileView>
      <div style={{color: colorFooter}}>
        <Footer color={colorFooter} fixed/>
      </div>
    </>
  );
};

export default Naxui;
