'use client'; // Adicione esta linha se estiver usando Next.js 13+ com App Router

import { useState } from 'react';
import styles from './Navbar.module.css'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className="container-page">
                <nav className={styles.navbar}>
                    {/* Menu Hamburger - LADO DIREITO */}
                    <div className={styles.hamburger} onClick={toggleMenu}>
                        <span className={`${styles.line} ${isMenuOpen ? styles.line1Active : ''}`}></span>
                        <span className={`${styles.line} ${isMenuOpen ? styles.line2Active : ''}`}></span>
                        <span className={`${styles.line} ${isMenuOpen ? styles.line3Active : ''}`}></span>
                    </div>

                    {/* Links do menu - LADO DIREITO quando aberto */}
                    <div className={`${styles.menu} ${isMenuOpen ? styles.menuActive : ''}`}>
                        <ul className={styles.navLinks}>
                            <li><a href="#" onClick={closeMenu}>Home</a></li>
                            <li><a href="#" onClick={closeMenu}>Quero investir</a></li>
                            <li><a href="#" onClick={closeMenu}>Preciso de um investimento</a></li>
                        </ul>
                        <ul className={styles.navLinks}>
                            <li><a href="#" onClick={closeMenu}>Cadastre-se</a></li>
                        </ul>
                    </div>

                    {/* Overlay para fechar o menu ao clicar fora */}
                    {isMenuOpen && (
                        <div className={styles.overlay} onClick={closeMenu}></div>
                    )}
                </nav>
            </div>
        </header>
    )
}