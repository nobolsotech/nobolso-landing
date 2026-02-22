"use client"

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./Forms.module.css";

export default function Forms() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    privacidade: false
  });

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    telefone: "",
    privacidade: ""
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const validateNome = (nome) => {
    if (!nome.trim()) return "Nome completo é obrigatório";
    if (nome.trim().split(" ").length < 2) return "Digite nome e sobrenome";
    if (nome.length < 3) return "Nome muito curto";
    if (nome.length > 100) return "Nome muito longo";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "E-mail é obrigatório";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Digite um e-mail válido";
    return "";
  };

  const validateTelefone = (telefone) => {
    if (!telefone.trim()) return "Telefone é obrigatório";
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10) return "Digite um telefone válido";
    if (telefoneLimpo.length > 11) return "Telefone muito longo";
    return "";
  };

  const validatePrivacidade = (privacidade) => {
    if (!privacidade) return "Você deve aceitar a política de privacidade";
    return "";
  };

  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 2) {
        return `(${numbers}`;
      } else if (numbers.length <= 6) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else if (numbers.length <= 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
      } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      }
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let formattedValue = value;
    
    if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      nome: validateNome(formData.nome),
      email: validateEmail(formData.email),
      telefone: validateTelefone(formData.telefone),
      privacidade: validatePrivacidade(formData.privacidade)
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Por favor, preencha todos os campos corretamente!");
    return;
  }

  try {
    const loadingToast = toast.info("Enviando seu cadastro...", {
      autoClose: false,
      isLoading: true,
    });

    const dadosParaEnviar = {
      nome: formData.nome.trim(),
      email: formData.email.trim().toLowerCase(),
      telefone: formData.telefone.replace(/\D/g, '')
    };

    console.log('📤 Enviando dados:', dadosParaEnviar);

    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosParaEnviar),
    });

    const result = await response.json();
    
    toast.dismiss(loadingToast);

    if (response.ok && result.success) {
      toast.success("🎉 Cadastro realizado! Verifique seu email.", {
        autoClose: 5000,
      });

      setFormData({
        nome: "",
        email: "",
        telefone: "",
        privacidade: false
      });

      setTimeout(() => {
        toast.info("📧 Email enviado com sucesso!", {
          autoClose: 3000,
        });
      }, 1000);

    } else {
      throw new Error(result.message || 'Erro ao processar cadastro');
    }

  } catch (error) {
    console.error('❌ Erro no submit:', error);
    
    let errorMessage = "Erro ao enviar formulário. Tente novamente.";
    
    if (error.message.includes('Failed to fetch')) {
      errorMessage = "Erro de conexão. Verifique sua internet.";
    } else if (error.message.includes('email')) {
      errorMessage = "Erro com o email. Verifique se está correto.";
    }
    
    toast.error(errorMessage, {
      autoClose: 5000,
    });
  }
};

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    let error = "";
    switch (name) {
      case 'nome':
        error = validateNome(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'telefone':
        error = validateTelefone(value);
        break;
      case 'privacidade':
        error = validatePrivacidade(formData.privacidade);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (error) {
      toast.warning(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <section className={styles.forms} ref={sectionRef}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Título principal */}
      <motion.h1 
        className={styles.title}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={itemVariants}
      >
        <span>CADASTRE-SE</span> PARA RECEBER AS{" "}
        <strong>PRIMEIRAS OPORTUNIDADES</strong>
      </motion.h1>

      {/* Texto descritivo */}
      <motion.p 
        className={styles.text}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={itemVariants}
        transition={{ delay: 0.1 }}
      >
        Seja o <span>primeiro a saber</span> quando lançarmos os primeiros
        grupos de investimentos e linhas de crédito.
      </motion.p>

      {/* Container principal do formulário */}
      <motion.div 
        className={styles.container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Título do formulário */}
        <motion.h1 
          className={styles.formTitle}
          variants={itemVariants}
        >
          FORMULÁRIO DE CADASTRO
        </motion.h1>

        {/* Formulário */}
        <motion.form 
          className={styles.form}
          variants={containerVariants}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Campo Nome Completo */}
          <motion.div 
            className={styles.inputGroup}
            variants={inputVariants}
            whileFocus={{ scale: 1.02 }}
          >
            <input
              type="text"
              id="nome"
              name="nome"
              className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
              placeholder="[NOME COMPLETO]"
              value={formData.nome}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
          </motion.div>

          {/* Campo E-mail */}
          <motion.div 
            className={styles.inputGroup}
            variants={inputVariants}
            transition={{ delay: 0.05 }}
            whileFocus={{ scale: 1.02 }}
          >
            <input
              type="email"
              id="email"
              name="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="[E-MAIL]"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </motion.div>

          {/* Campo Telefone */}
          <motion.div 
            className={styles.inputGroup}
            variants={inputVariants}
            transition={{ delay: 0.1 }}
            whileFocus={{ scale: 1.02 }}
          >
            <input
              type="tel"
              id="telefone"
              name="telefone"
              className={`${styles.input} ${errors.telefone ? styles.inputError : ''}`}
              placeholder="[TELEFONE]"
              value={formData.telefone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.telefone && <span className={styles.errorText}>{errors.telefone}</span>}
          </motion.div>

          {/* Checkbox de Privacidade */}
          <motion.div 
            className={styles.checkboxGroup}
            variants={itemVariants}
            transition={{ delay: 0.15 }}
          >
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                name="privacidade"
                className={styles.checkbox} 
                checked={formData.privacidade}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className={`${styles.checkmark} ${errors.privacidade ? styles.checkmarkError : ''}`}></span>
              LI E CONCORDO COM A [POLÍTICA DE PRIVACIDADE]
            </label>
            {errors.privacidade && <span className={styles.errorText}>{errors.privacidade}</span>}
          </motion.div>

          {/* Botão de Submit */}
          <motion.div 
            className={styles.button}
            variants={buttonVariants}
            transition={{ delay: 0.2 }}
          >
            <motion.button 
              type="submit" 
              className={styles.submitButton}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              QUERO FAZER PARTE DA LISTA
            </motion.button>
          </motion.div>
        </motion.form>

        {/* Texto de descrição/privacidade */}
        <motion.p 
          className={styles.description}
          variants={itemVariants}
          transition={{ delay: 0.25 }}
        >
          Transparência e Segurança A NoBolso atua em conformidade com a Lei
          Geral de Proteção de Dados (LGPD) e preza pela confidencialidade de
          todas as informações cadastradas. Política de Privacidade Ao preencher
          este formulário, você autoriza o uso dos seus dados pessoais pela
          NoBolso, em conformidade com a Lei Geral de Proteção de Dados (LGPD -
          Lei n° 13.709/2018). Seus dados serão utilizados exclusivamente para
          comunicação relacionada à plataforma, incluindo: Oportunidades de
          investimento e crédito Conteúdos informativos e educativos Avisos
          sobre atualizações e funcionalidades. Não compartilharemos seus dados
          com terceiros sem seu consentimento. Você pode solicitar a exclusão,
          correção ou acesso aos seus dados a qualquer momento, enviando um
          e-mail para privacidade@nobolso.com.br ou acessando nossa [Política de
          Privacidade completa]. Estamos comprometidos com a transparência, a
          segurança e o respeito à sua privacidade. Aviso de Segurança A NoBolso
          nunca solicita depósitos antecipados, senhas ou dados bancários por
          e-mail, SMS ou WhatsApp. Todas as interações ocorrem exclusivamente
          por meio da nossa plataforma oficial. Em caso de dúvida, entre em
          contato diretamente com nossa equipe.
        </motion.p>
      </motion.div>
    </section>
  );
}
