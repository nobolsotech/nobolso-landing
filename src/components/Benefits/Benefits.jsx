"use client"

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Benefits.module.css";

export default function Benefits() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Variantes para animação em cascata dos itens
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -40 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <section className={styles.benefits} ref={sectionRef}>
      {/* Texto principal com animação */}
      <motion.div 
        className={styles.text}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textVariants}
      >
        Cadastre-se agora para receber conteúdos sobre oportunidades de
        investimento direto e avisos antecipados assim que as primeiras
        oportunidades estiverem disponíveis.
      </motion.div>

      {/* Container dos itens com animação em cascata */}
      <motion.div 
        className={styles.items}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Item 1 */}
        <motion.div 
          className={styles.item}
          variants={itemVariants}
          whileHover={{ 
            y: -8,
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className={styles.icon}
            variants={iconVariants}
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >           
            <img 
              src="images/nobolso-icon-1-ofc.png" 
              alt="Ícone" 
              className={styles.iconImage}
            />
          </motion.div>

          <motion.div 
            className={styles.info}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Investimento direto, sem banco no meio
          </motion.div>
        </motion.div>

        {/* Item 2 */}
        <motion.div 
          className={styles.item}
          variants={itemVariants}
          whileHover={{ 
            y: -8,
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className={styles.icon}
            variants={iconVariants}
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >           
            <img 
              src="images/nobolso-icon-2-ofc.png" 
              alt="Ícone" 
              className={styles.iconImage}
            />
          </motion.div>

          <motion.div 
            className={styles.info}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Mais <br /> controle e previsibilidade
          </motion.div>
        </motion.div>

        {/* Item 3 */}
        <motion.div 
          className={styles.item}
          variants={itemVariants}
          whileHover={{ 
            y: -8,
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className={styles.icon}
            variants={iconVariants}
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >           
            <img 
              src="images/nobolso-icon-3-ofc.png" 
              alt="Ícone" 
              className={styles.iconImage}
            />
          </motion.div>

          <motion.div 
            className={styles.info}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Dados claros e acompanhamento constante
          </motion.div>
        </motion.div>

        {/* Item 4 - com animação especial por ser diferente */}
        <motion.div 
          className={styles.itemED}
          variants={itemVariants}
          whileHover={{ 
            y: -8,
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className={styles.iconLast}
            variants={iconVariants}
            whileHover={{ 
              scale: 1.2,
              rotate: 360,
              transition: { duration: 0.6 }
            }}
          >           
            <img 
              src="images/nobolso-icon-4-ofc.png" 
              alt="Ícone" 
              className={styles.iconImageLast}
            />
          </motion.div>

          <motion.div 
            className={styles.info}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Conteúdos exclusivos e convites antecipados
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
