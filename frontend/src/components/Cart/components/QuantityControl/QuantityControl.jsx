import React from 'react';
import clsx from 'clsx';
import styles from './QuantityControl.module.scss';

function QuantityControl({ value, onIncrease, onDecrease }) {
    return (
        <div className={styles.controls}>
            <button
                className={clsx(styles.btn, styles.plus)}
                data-testid="cart-item-amount-increase"
                onClick={onIncrease}
            />
            <span className={styles.qty} data-testid="cart-item-amount">
                {value}
            </span>
            <button
                className={clsx(styles.btn, styles.minus)}
                data-testid="cart-item-amount-decrease"
                onClick={onDecrease}
            />
        </div>
    );
}

export default QuantityControl;
