"use client";
import React, { Suspense } from "react";
import styles from "../../app/page.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import Loading from "@/app/loading";

const Hero = () => {
  const firstText = useRef(null);

  const secondText = useRef(null);

  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
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

    xPercent += 0.01 * direction;
  };
  return (
    <div className="main my-auto">
      <div className={styles.sliderContainer}>
        <div className={`${styles.slider} text-6xl md:text-8xl`}>
          <p ref={firstText} className="my-auto">
            Your Gateway to Article Summarization.
          </p>
          <p ref={secondText} className="my-auto">
            Your Gateway to Article Summarization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
