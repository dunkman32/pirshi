import React from 'react';
import Particles from 'react-particles-js';

const ParticlesBackground = ({numbers}) => {
  return (
    <Particles
      style={{
        backgroundColor: '#374057',
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '100%',
        zIndex: -1
      }}
      params={{
        "particles": {
          "number": {
            "value": numbers
          },
          "size": {
            "value": 3
          }
        },
        "interactivity": {
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            }
          }
        }}}
    />
  );
};

export default ParticlesBackground;
