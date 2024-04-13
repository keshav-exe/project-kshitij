"use client";
import React from "react";
import styles from "../../app/page.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";

const Hero = () => {
  const firstText = useRef(null);

  const secondText = useRef(null);

  const slider = useRef(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,

        scrub: 0.5,

        start: 0,

        end: window.innerHeight,

        onUpdate: (e) => (direction = e.direction * -1),
      },

      x: "-500px",
    });

    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }

    gsap.set(firstText.current, { xPercent: xPercent });

    gsap.set(secondText.current, { xPercent: xPercent });

    requestAnimationFrame(animate);

    xPercent += 0.03 * direction;
  };
  return (
    <div className="main">
      <div className={styles.sliderContainer}>
        <div className={`${styles.slider} text-[6rem] md:text-[12rem]`}>
          <p ref={firstText}>Your Gateway to Article Summarization.</p>

          <p ref={secondText}>Your Gateway to Article Summarization.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
