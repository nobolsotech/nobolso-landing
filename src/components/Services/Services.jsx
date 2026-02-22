"use client"

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Services.module.css";

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Variantes para animações
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 40,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const subItemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={styles.services} ref={sectionRef}>
      {/* Título principal */}
      <motion.h1
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleVariants}
        whileHover={{ scale: 1.05 }}
      >
        COMO FUNCIONA?
      </motion.h1>

      {/* Container 1 - PARA INVESTIDORES */}
      <motion.div 
        className={styles.container1}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <h2>
          PARA INVESTIDORES
        </h2>
        
        <motion.div 
          className={styles.box}
          variants={containerVariants}
        >
          <motion.div 
            className={styles.info}
            variants={containerVariants}
          >
            <motion.p 
              className={styles.text}
              variants={textVariants}
            >
              Invista com inteligência e impacto social. A{" "}
              <strong>NoBolso</strong> conecta você a grupos de microcrédito
              organizados por risco de crédito (A a D), com diferentes níveis de
              rentabilidade.
            </motion.p>

            <motion.div 
              className={styles.item}
              variants={itemVariants}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className={styles.subtitle}
                whileHover={{ scale: 1.02 }}
              >
                VOCÊ INVESTE EM COTAS DE R$ 500
              </motion.h3>
              <motion.p 
                className={styles.subtext}
                variants={subItemVariants}
              >
                - Cada grupo (A, B, C ou D) representa um nível de risco e
                retorno
              </motion.p>
              <motion.p 
                className={styles.subtext}
                variants={subItemVariants}
              >
                - A classificação é feita por IA e dados de crédito
              </motion.p>
              <motion.p 
                className={styles.subtext}
                variants={subItemVariants}
              >
                - Quanto maior o risco, maior o potencial de retorno
              </motion.p>
            </motion.div>

            <motion.div 
              className={styles.item}
              variants={itemVariants}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className={styles.subtitle}
                whileHover={{ scale: 1.02 }}
              >
                RETORNO PREVISTO: ATÉ 300% DO CDI
              </motion.h3>
              <motion.p className={styles.subtext}>
                - Com previsibilidade mensal
              </motion.p>
              <motion.p className={styles.subtext}>
                - Sem intermediação de bancos
              </motion.p>
              <motion.p className={styles.subtext}>
                - Seu capital é diversificado automaticamente em dezenas de
                tomadores
              </motion.p>
            </motion.div>

            <motion.div 
              className={styles.item}
              variants={itemVariants}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className={styles.subtitleEX}
                whileHover={{ scale: 1.05 }}
              >
                EXEMPLO
              </motion.h3>
              <motion.p className={styles.subtext}>
                - O Grupo A possui uma cota de R$ 5.000. Dez investidores
                aplicaram R$ 500. Cada cota é doada para empréstimo a dez
                tomadores com excelente histórico de pagamento. Cada tomador
                recebe R$ 500. Você recebe mensalmente a sua parcela do
                principal + juros, de forma proporcional ao seu investimento.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.img 
            className={`${styles.img} ${styles.lastItem}`} 
            src="images/Teste-services.png" 
            alt="Investidores NoBolso"
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.4 }
            }}
          />
        </motion.div>
      </motion.div>

      {/* Container 2 - PARA QUEM PRECISA DE EMPRÉSTIMO */}
      <motion.div 
        className={styles.container2}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <h2>
          PARA QUEM PRECISA DE EMPRÉSTIMO
        </h2>
        
        <motion.div 
          className={styles.box}
          variants={containerVariants}
        >
          <motion.div 
            className={styles.info}
            variants={containerVariants}
          >
            <motion.p 
              className={styles.text}
              variants={textVariants}
            >
              Na <strong>NoBolso</strong>, você pode solicitar um microcrédito
              de até R$ 500 com aprovação simplificada.
            </motion.p>

            <motion.div 
              className={styles.item}
              variants={itemVariants}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className={styles.subtitle}
                whileHover={{ scale: 1.02 }}
              >
                PROCESSO 100% DIGITAL
              </motion.h3>
              <motion.p className={styles.subtext}>
                - Sem filas, com burocracia
              </motion.p>
              <motion.p className={styles.subtext}>
                - Análise automatizada com base no seu histórico e perfil.
              </motion.p>
            </motion.div>

            <motion.div 
              className={styles.item}
              variants={itemVariants}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className={styles.subtitle}
                whileHover={{ scale: 1.02 }}
              >
                JUROS JUSTOS E PARCELAS ACESSÍVEIS
              </motion.h3>
              <motion.p className={styles.subtext}>
                - Você paga menos do que pagaria em um banco tradicional ou
                cartão
              </motion.p>
              <motion.p className={styles.subtext}>
                - Não exigimos garantias ou fiador
              </motion.p>
            </motion.div>

            <motion.div 
              className={styles.item}
              variants={itemVariants}
              whileHover={{ 
                x: 10,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h3 
                className={styles.subtitle}
                whileHover={{ scale: 1.02 }}
              >
                O DINHEIRO CAI DIRETO NA SUA CONTA
              </motion.h3>
              <motion.p className={styles.subtext}>
                - Após aprovação e captação, o valor é depositado em poucos dias
                na primeira vez, e poucas horas a partir do primeiro empréstimo
                quitado.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.img 
            className={`${styles.img2} ${styles.lastItem}`} 
            src="images/Teste-services2.png" 
            alt="Empréstimos NoBolso"
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.4 }
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
