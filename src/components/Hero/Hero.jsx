"use client"

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Variantes para animação em cascata
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.hero} ref={sectionRef}>
      {/* Background com animação sutil */}
      <motion.div 
        className={styles.background}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img src="images/nobolso-home-screen-image.png" alt="" />
      </motion.div>
      
      <div className={styles.container}>
        <div className={styles.HeroContent}>
          {/* Logo com animação de escala */}
          <motion.img 
            src="images/Logo nobolso.png" 
            alt="Logo Nobolso"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "backOut" }}
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Títulos com animação em cascata */}
          <motion.div 
            className={styles.Titles}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div className={styles.Title1} variants={itemVariants}>
              INVISTA COM
            </motion.div>
            <motion.div 
              className={styles.Title2} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              RENDIMENTO
            </motion.div>
            <motion.div 
              className={styles.Title3} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              REAL
            </motion.div>
            
            <motion.h1 
              className={styles.subTitle1}
              variants={slideInLeft}
            >
              ACESSE <span>CRÉDITO</span> COM
            </motion.h1>
            <motion.h1 
              className={styles.subTitle2}
              variants={slideInRight}
            >
              MENOS <span>BUROCRACIA.</span>
            </motion.h1>
          </motion.div>
        </div>
        
        <div className={styles.HeroImg}>
          {/* Imagem adicional pode ser adicionada aqui com animação */}
        </div>
      </div>
      
      {/* Seção de informações com animação escalonada */}
      <motion.div 
        className={styles.HeroInfo}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.8
            }
          }
        }}
      >
        <motion.p 
          className={styles.text}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut"
              }
            }
          }}
          whileHover={{ y: -2 }}
        >
          Somos uma plataforma de crédito <strong>peer-to-peer (P2P)</strong>{" "}
          que conecta investidores a pessoas que precisam de financiamento para
          crescer. Estamos criando uma nova forma de investir, com menos
          burocracia, mais transparência e retorno real para quem acredita no
          poder do crédito colaborativo.
        </motion.p>
        
        <motion.p 
          className={styles.text}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2
              }
            }
          }}
          whileHover={{ y: -2 }}
        >
          Fornecemos a <strong>solução ideal</strong> para quem quer
          rentabilidade com quem precisa de crédito rápido e justo. Você investe
          em pessoas reais, com mais controle, transparência e retorno acima do
          mercado tradicional. Receba informações exclusivas em primeira mão.
        </motion.p>
      </motion.div>
    </section>
  );
}
