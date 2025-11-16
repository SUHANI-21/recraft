'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

const VantaBackground = () => {
  const vantaRef = useRef(null);
  // Use useRef to hold the Vanta instance so it persists across renders
  const vantaEffect = useRef(null);

  useEffect(() => {
    // This effect runs only once when the component is first added to the page.
    // An interval is the most reliable way to wait for external scripts.
    const checkInterval = setInterval(() => {
      // Check if the VANTA and THREE objects are available on the window
      if (window.VANTA && window.THREE && vantaRef.current) {
        
        // Once they are found, stop checking.
        clearInterval(checkInterval);

        // Initialize Vanta only if it hasn't been initialized already.
        if (!vantaEffect.current) {
          console.log("SUCCESS: Vanta and Three.js are ready. Initializing effect.");
          vantaEffect.current = window.VANTA.BIRDS({
            el: vantaRef.current,
            THREE: window.THREE,
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
            quantity: 3.00
          });
        }
      } else {
        console.log("Waiting for Vanta and Three.js scripts...");
      }
    }, 500); // Check every half a second

    // This is the cleanup function. It runs when the user navigates away from the page.
    return () => {
      console.log("Cleaning up Vanta component.");
      clearInterval(checkInterval); // Stop checking if we navigate away
      if (vantaEffect.current) {
        console.log("Destroying Vanta effect.");
        vantaEffect.current.destroy(); // This is crucial to prevent memory leaks
      }
    };
  }, []); // The empty array [] ensures this effect runs ONLY once.

  return (
    <>
      {/* These Script tags just handle loading the files into the browser.
          The useEffect above is responsible for WAITING for them and starting the animation. */}
      <Script src="/scripts/three.r134.min.js" strategy="afterInteractive" />
      <Script src="/scripts/vanta.birds.min.js" strategy="afterInteractive" />

      <div 
        ref={vantaRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default VantaBackground;