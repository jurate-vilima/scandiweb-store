import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.scss';

function Button({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
    children,
    className,
    ...rest
}) {
    const buttonClassName = clsx(
        styles.btn,
        styles[`btn-${variant}`],
        styles[`btn-${size}`],
        className,
    );

    return (
        <button
            type="button"
            className={buttonClassName}
            disabled={disabled}
            onClick={onClick}
            {...rest}
        >
            <div className={styles.btnText}>{children}</div>
        </button>
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Button;
