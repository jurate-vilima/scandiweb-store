import React from 'react';
import styles from './CartItem.module.scss';
import { ProductPrice, ProductName } from '@/components/Product';
import { ProductAttributes } from '@/components/Attribute';
import { QuantityControl } from '@/components/Cart';

function CartItem({ item, onIncrease, onDecrease }) {
    return (
        <div className={styles.cartItem} data-testid="cart-item">
            <div className={styles.cartItemInfo}>
                <ProductName size="small" className={styles.productName}>
                    {item.name}
                </ProductName>

                <ProductPrice
                    price={item.price}
                    currency={item.currency}
                    showLabel={false}
                    size="small"
                />

                <ProductAttributes
                    attributes={item.attributesDefinition}
                    selectedAttributes={item.attributes}
                    onSelect={() => {}}
                    variant="compact"
                    className={styles.attributes}
                />
            </div>

            <QuantityControl
                value={item.quantity}
                onIncrease={() => onIncrease(item.key)}
                onDecrease={() => onDecrease(item.key)}
            />

            <div className={styles.imageWrapper}>
                <img src={item.mainImage} alt={item.name} />
            </div>
        </div>
    );
}

export default CartItem;
