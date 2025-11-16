'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  let vantaEffect = null;

  const initVanta = () => {
    // This function will only be called after the Vanta script has loaded
    if (window.VANTA && window.THREE && vantaRef.current) {
      console.log("Vanta script loaded. Initializing effect...");
      try {
        vantaEffect = window.VANTA.BIRDS({
          el: vantaRef.current,
          THREE: window.THREE, // Explicitly pass the THREE object
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0xfdf6e3,
          color1: 0x3e5638,
          color2: 0x7ba05b,
          birdSize: 1.5,
          separation: 50.00,
          alignment: 20.00,
          cohesion: 20.00,
          quantity: 3.00
        });
      } catch (error) {
        console.error("[Vanta Error] Failed to initialize:", error);
      }
    }
  };

  useEffect(() => {
    // The only job of this effect is to clean up the animation when we leave the page
    return () => {
      if (vantaEffect) {
        console.log("Cleaning up Vanta effect.");
        vantaEffect.destroy();
      }
    };
  }, []); // Empty dependency array means this runs only on mount and unmount

  return (
    <>
      {/* 
        This is the main div that Vanta will attach its canvas to.
      */}
      <div 
        ref={vantaRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* 
        The Script component for Vanta is now INSIDE the onLoad of Three.js.
        This guarantees the load order.
      */}
      <Script 
        src="/scripts/three.r134.min.js" 
        strategy="afterInteractive"
        onLoad={() => {
          // This function runs ONLY after three.js is successfully loaded
          console.log("Three.js loaded successfully. Now loading Vanta Birds...");
          const vantaScript = document.createElement('script');
          vantaScript.src = '/scripts/vanta.birds.min.js';
          vantaScript.onload = initVanta; // When Vanta loads, call our init function
          document.body.appendChild(vantaScript);
        }}
        onError={(e) => console.error("Error loading Three.js:", e)}
      />
    </>
  );
};

export default VantaBackground;