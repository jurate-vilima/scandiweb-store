import React, { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';

import ImageSlider from '@/components/ImageSlider/ImageSlider';
import { useProduct } from '@/hooks/product/useProduct';
import { ProductName, ProductPrice } from '@/components/Product';
import { AddToCart, ProductDescription } from '@/pages/ProductPage/components';
import { ProductAttributes } from '@/components/Attribute';
import { useDocumentTitle } from '@/hooks/meta/useDocumentTitle';
import Loader from '@/components/ui/Loader/Loader';
import EmptyState from '@/components/EmptyState/EmptyState';

function ProductPage() {
    const { product, loading, error } = useProduct();
    const [selectedAttributes, setSelectedAttributes] = useState({});

    const handleSelectAttribute = (attrName, value) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attrName]: value,
        }));
    };

    const allSelected =
        product?.attributes?.every((attr) => selectedAttributes[attr.name]) ??
        true;

    const title = loading ? '' : product?.name;
    useDocumentTitle(title, [loading, product]);

    if (loading) return <Loader />;
    if (error || !product) {
        return (
            <EmptyState
                title="Product Not Found"
                message="We couldn't find the product you're looking for."
            />
        );
    }

    return (
        <div className={styles.productPage}>
            <div className={styles.productData}>
                <div className={styles.productSlider}>
                    <ImageSlider images={product.gallery || []} />
                </div>

                <div className={styles.productParams}>
                    <ProductName as="h1" size="large">
                        {product.name}
                    </ProductName>

                    <ProductAttributes
                        className={styles.productAttributes}
                        attributes={product.attributes}
                        selectedAttributes={selectedAttributes}
                        onSelect={handleSelectAttribute}
                    />

                    <ProductPrice
                        price={product.price}
                        currency={product.currency}
                        size="large"
                        variant="attribute"
                    />

                    <AddToCart
                        className={styles.btn}
                        product={product}
                        selectedAttributes={selectedAttributes}
                        allSelected={allSelected}
                    />

                    <ProductDescription description={product.description} />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
