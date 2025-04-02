// src/components/Header/Header.jsx
import React, { useContext } from 'react';
import { CategoryContext } from '@/contexts';
import { CartButton } from '@/components/Cart';
import { HeaderNav } from '@/components/Header';
import BurgerMenuButton from '@/components/ui/BurgerMenuButton/BurgerMenuButton';
import Logo from '@/assets/logos/Logo';
import { useHeaderLogic } from '@/hooks/layout/useHeaderLogic';

import styles from './Header.module.scss';

function Header() {
    const { categories, activeCategory, isReady } = useContext(CategoryContext);
    const {
        isMobileMenuOpen,
        toggleMenu,
        closeMenu,
        handleCartClick,
        handleHeaderClick,
    } = useHeaderLogic();

    return (
        <header className={styles.header} onClick={handleHeaderClick}>
            <div className="container">
                <div className={styles.wrapper}>
                    {isReady && (
                        <HeaderNav
                            categories={categories}
                            activeCategory={activeCategory}
                            isMobileMenuOpen={isMobileMenuOpen}
                            onLinkClick={closeMenu}
                        />
                    )}

                    <BurgerMenuButton
                        isOpen={isMobileMenuOpen}
                        onClick={toggleMenu}
                    />

                    <div className={styles.logo}>
                        <Logo
                            className={styles.logoIcon}
                            aria-label="Shop Logo"
                        />
                    </div>

                    <div className={styles.cart}>
                        <CartButton
                            showBadge
                            enableShake 
                            className={styles.cartIcon}
                            data-testid="cart-btn"
                            onClick={handleCartClick}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
