import React from 'react';
import { ProductCard } from '@/components/Product';
import styles from './ProductsGrid.module.scss';

function ProductsGrid({ products, categoryName }) {
    if (products.length === 0) {
        return <p className={styles.empty}>No products in this category</p>;
    }

    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={categoryName}
                />
            ))}
        </div>
    );
}

export default ProductsGrid;
