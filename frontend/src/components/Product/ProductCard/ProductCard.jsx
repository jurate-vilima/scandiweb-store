import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { kebabCase } from '@/utils/stringUtils';
import { getMainImage } from '@/utils/productUtils';
import { useQuickShop } from '@/hooks/product/useQuickShop';

import { CartButton } from '@/components/Cart';
import { ProductName, ProductPrice } from '@/components/Product';
import styles from './ProductCard.module.scss';

function ProductCard({ product, categoryName }) {
    const handleQuickAddToCart = useQuickShop();

    const productTestId = `product-${kebabCase(product.name)}`;
    const mainImage = getMainImage(product);
    const isOutOfStock = !product.inStock;

    return (
        <Link
            to={`/product/${product.id}`}
            state={{ fromCategory: categoryName }}
            data-testid={productTestId}
            className={clsx(styles.card, {
                [styles.outOfStock]: isOutOfStock,
            })}
        >
            <div className={styles.imageWrapper}>
                <div className={styles.image}>
                    <img src={mainImage} alt={product.name} />
                </div>

                {!isOutOfStock && (
                    <CartButton
                        className={styles.quickShopButton}
                        dataTestId="quick-shop"
                        aria-label="Quick add to cart"
                        onClick={(e) => handleQuickAddToCart(product, e)}
                        showBadge={false}
                    />
                )}
            </div>

            <div className={styles.info}>
                <ProductName size="medium">{product.name}</ProductName>
                <ProductPrice
                    className={styles.price}
                    price={product.price}
                    currency={product.currency || '$'}
                    size="medium"
                    showLabel={false}
                />
            </div>
        </Link>
    );
}

export default ProductCard;
