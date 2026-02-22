"use client"

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Differentials.module.css";

export default function Differentials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Variantes simples e clean
  const logoVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return(
    <section className={styles.differentials} ref={sectionRef}>
      <div className={styles.images}>
        {/* Logo com entrada suave */}
        <motion.img 
          className={styles.img1} 
          src="images/Logo nobolso.png" 
          alt="Logo NoBolso"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={logoVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        />
        
        {/* Imagem com entrada suave e delay */}
        <motion.img 
          className={styles.img2} 
          src="images/Teste-differentials.png" 
          alt="Diferenciais NoBolso"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
          whileHover={{ 
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
        />
      </div>
    </section>
  );
}