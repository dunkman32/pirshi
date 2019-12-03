import React from 'react';
import { Random } from 'react-animated-text';
import randomColor from 'randomcolor';
import Header from '../components/header';
import Footer from '../components/footer';
import {
  BrowserView,
  MobileView,
} from 'react-device-detect';

const Naxui = () => {
  const color = randomColor({ luminosity: 'dark' });
  return (
    <>
      <Header notfixed/>
      <BrowserView>
        <div style={{ fontSize: 72, fontWeight: 'bolder', marginTop: '22%', color,  padding: 20 }}>
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
      <Footer fixed/>
    </>
  );
};

export default Naxui;
